/**
 * 汉字比对状态枚举
 */
export enum CharState {
  /** 完全不匹配（字和音都不对） */
  ABSENT = 0,

  /** * 1. 读音正确，位置不正确，对应的字也不是这个
   * 逻辑：该读音在答案的其他位置出现了
   */
  PRON_CORRECT_POS_WRONG = 1,

  /** * 2. 字在答案中出现，但位置不正确
   * 逻辑：这个字本身就在答案里，只是不在这个格子里
   */
  CHAR_CORRECT_POS_WRONG = 2,

  /** * 3. 读音正确，位置正确，字也正确
   * 逻辑：完全匹配（绿色状态）
   */
  CORRECT = 3,

  /** * 4. 读音正确，位置正确，字不正确
   * 逻辑：这个位置的拼音是对的，但字选错了（同音字）
   */
  PRON_CORRECT_POS_CORRECT = 4,

  /** 5. 仅声调正确，且位置正确（字和读音都不对） */
  TONE_CORRECT_POS_CORRECT = 5,
}

export interface CheckResult {
  char: string;
  pinyin: string; // 基础拼音，不带声调 (如 "hao")
  tone: number; // 声调数字 (0-4)
  state: CharState;
}
