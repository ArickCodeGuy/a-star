export function getRandomItemFromArray<T>(arr: T[]): T {
  if (!arr.length) throw new Error('No items to get random item from: ', arr);

  const idx = Math.floor(Math.random() * arr.length);

  return arr[idx];
}
