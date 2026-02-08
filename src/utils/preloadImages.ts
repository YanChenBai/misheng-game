import { questions } from '@/questions';

/**
 * 预加载单个图片
 * @param src 图片地址
 * @returns Promise<void>
 */
function preloadImage(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * 预加载所有问题图片
 * @returns Promise<void>
 */
export function preloadQuestionImages(): Promise<void> {
  const imageUrls = questions.map((q) => q.image);
  const promises = imageUrls.map((url) => preloadImage(url));

  return Promise.all(promises).then(() => {});
}
