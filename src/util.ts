export const byteFormat = (b: number): string =>
  b > 2000 ? `${(b / 1000).toFixed(2)} kB` : `${b} B`;
