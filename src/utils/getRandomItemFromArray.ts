export function getRandomIndexFromArray<T>(arr: T[]): number {
  if (!arr.length) throw new Error(`Array is empty: ${arr}`);

  return Math.floor(Math.random() * arr.length);
}

export function getRandomItemFromArray<T>(arr: T[]): T {
  if (!arr.length) throw new Error(`Array is empty: ${arr}`);

  const idx = Math.floor(Math.random() * arr.length);

  return arr[idx];
}
