import { resolveRoot } from '../config.js'
import { resolve } from 'path'

export const configPath = resolveRoot('./config.js')
export const libFolder = resolveRoot('./src/lib')

const resolveVendor = path => resolve(vendorFolder, path)

export function getAlias(name) {
  return  { 'config': configPath
          }
}
