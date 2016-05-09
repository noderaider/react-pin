import { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin, SourceMapDevToolPlugin, ProvidePlugin, IgnorePlugin, optimize } from 'webpack'
import { baseUrl, IS_DEV, IS_BROWSER } from '../config.js'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const { CommonsChunkPlugin, UglifyJsPlugin, OccurenceOrderPlugin } = optimize

const NODE_ENV = process.env.NODE_ENV || 'production'
console.warn(`WEBPACK USING NODE_ENV => ${NODE_ENV}`)
const getDefinePlugin = name => new DefinePlugin( { __HOT__: process.env.NODE_ENV === 'hot'
                                                  , __BASEURL__: baseUrl
                                                  , 'process.env.NODE_ENV': `"${NODE_ENV || 'development'}"`
                                                  } )

export const extractText = (loaders, options) => ExtractTextPlugin.extract('style-loader', loaders, options)

export const getPlugins = name => {
  let plugins = [ getDefinePlugin(name)
                , new OccurenceOrderPlugin()
                ]
  //plugins.push(new ExtractTextPlugin('[name].css', { allChunks: true, disable: false }))
  if(/^win/.test(process.platform))
    plugins.push(new IgnorePlugin(/dtrace-provider/i))

  if(!IS_DEV) {
    plugins.push(new optimize.DedupePlugin())
    var uglifyOptions = { compress: { warnings: false } }
    plugins.push(new UglifyJsPlugin(uglifyOptions))
  }
  return plugins
}
