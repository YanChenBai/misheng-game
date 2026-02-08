import confetti from 'canvas-confetti';

export const fireCenterConfetti = async (customImageUrls: string[] = []) => {
  // 1. 预加载图片
  const imagePromises = customImageUrls.map((url) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  });

  const loadedImages = await Promise.all(imagePromises);

  // 2. 准备形状
  const emojiShapes = ['🎂', '🎁', '🎈', '✨', '🌸', '🍭'].map((emoji) =>
    confetti.shapeFromText({ text: emoji, scalar: 3 }),
  );

  const imageShapes = loadedImages.map(
    (img) =>
      ({
        type: 'image',
        src: img.src,
        width: 32,
        height: 32,
      }) as any,
  );

  // 3. 执行单次大爆发
  await confetti({
    particleCount: 120, // 增加数量，因为只有这一个发射点
    spread: 100, // 扩散角度变大，看起来更圆
    origin: { x: 0.5, y: 0.7 }, // 坐标：正中心
    ticks: 200, // 粒子在屏幕上停留的时间
    gravity: 0.6, // 稍微调低重力，让它们飘得更久
    decay: 0.94,
    startVelocity: 45, // 初始速度快一点，向四周喷射效果好
    shapes: [...emojiShapes, ...imageShapes],
    scalar: 2.5, // 让图标大一点，更可爱
    zIndex: 9999, // 确保在所有 UI 组件之上
  });
};
