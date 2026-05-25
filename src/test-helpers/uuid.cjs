const { randomUUID } = require('node:crypto');

function v4() {
  return randomUUID();
}

function v1() {
  return randomUUID();
}

function v3() {
  return randomUUID();
}

function v5() {
  return randomUUID();
}

function v6() {
  return randomUUID();
}

function v7() {
  return randomUUID();
}

const NIL = '00000000-0000-0000-0000-000000000000';

function validate(value) {
  return typeof value === 'string' && /^[0-9a-fA-F-]{36}$/.test(value);
}

function version(value) {
  if (!validate(value)) return 0;
  return Number.parseInt(value[14], 16);
}

function parse(value) {
  if (!validate(value)) throw new TypeError('Invalid UUID');
  return Buffer.from(value.replace(/-/g, ''), 'hex');
}

function stringify(bytes) {
  const hex = Buffer.from(bytes).toString('hex');
  if (hex.length < 32) throw new TypeError('Invalid UUID bytes');
  return (
    hex.slice(0, 8) +
    '-' +
    hex.slice(8, 12) +
    '-' +
    hex.slice(12, 16) +
    '-' +
    hex.slice(16, 20) +
    '-' +
    hex.slice(20, 32)
  );
}

module.exports = {
  v1,
  v3,
  v4,
  v5,
  v6,
  v7,
  NIL,
  parse,
  stringify,
  validate,
  version,
};
