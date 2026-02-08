import { pinyin } from 'pinyin-pro';

import { CharState, type CheckResult } from '@/types';

export function checkWord(answer: string, guess: string): CheckResult[] {
  const answerChars = answer.split('');
  const guessChars = guess.split('');

  // 1. 获取基础拼音 (用于逻辑比对)
  const answerPinYinsNone = pinyin(answer, { toneType: 'none', type: 'array' });
  const guessPinYinsNone = pinyin(guess, { toneType: 'none', type: 'array' });

  // 2. 获取声调数字 (仅用于提取 tone 字段)
  const answerPinYinsNumeric = pinyin(answer, { toneType: 'num', type: 'array' });
  const guessPinYinsNumeric = pinyin(guess, { toneType: 'num', type: 'array' });

  // 提取声调的工具函数
  const extractTone = (p: string): number => {
    const lastChar = p.slice(-1);
    const toneNum = parseInt(lastChar, 10);
    return isNaN(toneNum) ? 0 : toneNum;
  };

  const results: CheckResult[] = guessChars.map((char, i) => ({
    char,
    pinyin: guessPinYinsNone[i]!, // 这里按你要求改为 none
    tone: extractTone(guessPinYinsNumeric[i]!),
    state: CharState.ABSENT,
  }));

  const usedIndices = new Set<number>();

  // --- 第一轮：位置判定 (Position-based) ---
  results.forEach((res, i) => {
    const isCharMatch = res.char === answerChars[i];
    const isPinyinMatch = guessPinYinsNone[i] === answerPinYinsNone[i];
    const isToneMatch = res.tone === extractTone(answerPinYinsNumeric[i]!);

    if (isCharMatch) {
      res.state = CharState.CORRECT;
      usedIndices.add(i);
    } else if (isPinyinMatch) {
      // 只要拼音字母对，位置对，就触发
      res.state = CharState.PRON_CORRECT_POS_CORRECT;
      usedIndices.add(i);
    } else if (isToneMatch) {
      // 字母不对但声调对
      res.state = CharState.TONE_CORRECT_POS_CORRECT;
    }
  });

  // --- 第二轮：存在判定 (Existence-based) ---
  results.forEach((res, i) => {
    // 跳过第一轮已经确定位置的状态（除了仅声调对的情况，因为它不占用消耗名额）
    if (res.state === CharState.CORRECT || res.state === CharState.PRON_CORRECT_POS_CORRECT) return;

    // 1. 检查字符是否出现在其他位置
    let foundCharIndex = -1;
    for (let j = 0; j < answerChars.length; j++) {
      if (!usedIndices.has(j) && answerChars[j] === res.char) {
        foundCharIndex = j;
        break;
      }
    }

    if (foundCharIndex !== -1) {
      res.state = CharState.CHAR_CORRECT_POS_WRONG;
      usedIndices.add(foundCharIndex);
      return;
    }

    // 2. 检查拼音(none)是否出现在其他位置
    let foundPinyinIndex = -1;
    for (let j = 0; j < answerPinYinsNone.length; j++) {
      if (!usedIndices.has(j) && answerPinYinsNone[j] === guessPinYinsNone[i]) {
        foundPinyinIndex = j;
        break;
      }
    }

    if (foundPinyinIndex !== -1) {
      res.state = CharState.PRON_CORRECT_POS_WRONG;
      usedIndices.add(foundPinyinIndex);
    }
  });

  return results;
}
