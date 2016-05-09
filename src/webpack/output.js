import { baseUrl, resolveRoot, __rootname } from '../config.js'
import path from 'path'

const getPath = name => {
  return resolveRoot('.')
}

const getLibrary = name => {
  return 'react-hatch'
}

const getLibraryTarget = name => {
  return 'umd'
}

const getFilename = name => '[name].js'
const getChunkFilename = name => '[name].js'
const getSourceMapFilename = name => '[file].map'
const getDevtoolModuleFilenameTemplate = name => 'file:///[absolute-resource-path]'
const getHotUpdateChunkFilename = name => '[id].[hash].hot-update.js'
const getHotUpdateMainFilename = name => '[hash].hot-update.json'
const getCrossOriginLoading = name => 'anonymous'

const getPublicPath = name => {
  return '/'
}

export function getOutput(name) {
  let output =  { path: getPath(name)
                , library: getLibrary(name)
                , libraryTarget: getLibraryTarget(name)
                , pathinfo: process.env.NODE_ENV === 'hot'
                , publicPath: getPublicPath(name)
                , filename: getFilename(name)
                , chunkFilename: getChunkFilename(name)
                , crossOriginLoading: getCrossOriginLoading(name)
                //, devtoolModuleFilenameTemplate: getDevtoolModuleFilenameTemplate(name)
                //, sourceMapFilename: getSourceMapFilename(name)
                //, hotUpdateChunkFilename: getHotUpdateChunkFilename(name)
                //, hotUpdateMainFilename: getHotUpdateMainFilename(name)
                }
  console.warn('OUTPUT', JSON.stringify(output, null, 2))
  return output
}
