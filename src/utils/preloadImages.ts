/**
 * 预加载单个图片
 * @param url 图片地址
 */
function preloadImage(url: string) {
  // const {} = Promise
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

/**
 * 批量加载图片
 */
export function preloadImages(urls: string[]) {
  return Promise.all(urls.map((url) => preloadImage(url)));
}
