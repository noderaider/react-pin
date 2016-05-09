import { resolveRoot } from '../config.js'
//import { extractText } from './plugins'

const getImageLoader = () => 'url-loader?limit=8192'

export function getLoaders(name) {
  return  [  getJsxLoader(name)
          , ...getStyleLoaders(name)

          , { test: /\.png$/
            , loader: 'url?mimetype=image/png&limit=100000&name=[name].[ext]'
            }
          , { test: /\.(gif|png|jpe?g|svg)$/i
            , loader: getImageLoader()
            }
          , { test: /\.(otf|eot|woff|woff2|ttf|svg)(\?\S*)?$/i
            , loader: 'url?limit=100000&name=[name].[ext]'
            }
          ]
}

export function getPostLoaders(name) {
  return []
}


const inlineStyleLoader = preLoaders => `style!${preLoaders}`

export const getStyleLoaders = name => {
  const useExtract = process.env.NODE_ENV !== 'hot'
  const cssLoader = `css${useExtract ? '?sourceMap' : ''}!postcss`
  const lessLoader = `${cssLoader}!less${useExtract ? '?sourceMap' : ''}`
  return  [ { test: /\.css$/, loader: /* useExtract ? extractText(cssLoader) : */ inlineStyleLoader(cssLoader) }
          , { test: /\.less$/, loader: /* useExtract ? extractText(lessLoader) : */ inlineStyleLoader(lessLoader) }
          ]
}

export const getJsxLoader = name => {
  return  { test: /\.jsx?$/
          , loaders: [ 'babel' ]
          , exclude:  [ /node_modules/ ]
          }
}


