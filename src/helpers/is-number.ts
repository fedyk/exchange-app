export function isNumber(value: string) {
  if (value.length === 0) {
    return true
  }

  if (/^\d+$/.test(value)) {
    return true
  }

  if (value.includes(".") && /^\d+\.\d*$/.test(value)) {
    return true
  }

  if (value.includes(",") && /^\d+,\d*$/.test(value)) {
    return true
  }

  return false
}
