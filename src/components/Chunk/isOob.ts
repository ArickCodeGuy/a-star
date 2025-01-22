/** Is out of bounds */
export function isOob<T>([x, y]: number[], mat: T[][]): boolean {
  const m = mat.length,
    n = mat[0].length;
  return x < 0 || y < 0 || x >= n || y >= m;
}
