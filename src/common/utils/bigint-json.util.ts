/**
 * Prisma returns BIGINT columns as JS BigInt, which JSON.stringify cannot serialize.
 * Register once at app startup so API responses serialize safely.
 */
export function enableBigIntJsonSerialization(): void {
  const proto = BigInt.prototype as bigint & { toJSON?: () => number | string };
  if (proto.toJSON) return;

  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value: function (this: bigint): number | string {
      const asNumber = Number(this);
      return Number.isSafeInteger(asNumber) ? asNumber : this.toString();
    },
    configurable: true,
  });
}
