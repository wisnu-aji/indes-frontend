import { SHA256 } from 'crypto-js'

export const hash = (text: string) => {
  // make hash witout secret
  const hash = SHA256(text).toString()
  return hash
}