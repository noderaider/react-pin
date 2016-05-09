import { log } from '../config'
import './style'

const validate = ({ assert, classNames, React, ReactCSSTransitionGroup }) => {
  if(!assert)
    throw new Error('react-hatch requires an assert dependency.')
  assert.ok(classNames, 'react-hatch requires classNames dependency.')
  assert.ok(React, 'react-hatch requires React dependency.')
  assert.ok(ReactCSSTransitionGroup, 'react-hatch requires ReactCSSTransitionGroup dependency.')
  return { assert, classNames, React, ReactCSSTransitionGroup }
}

const generateArray = N => [...(function*(){let i=0;while(i<N)yield i++})()]


export default dependencies => {
  const { assert, classNames, React, ReactCSSTransitionGroup } = validate(dependencies)
  const { Component, PropTypes } = React


  const PinHorizontal = ({ pin = [], onEntry, maxDigits, theme }) => {
    const containerStyle = {}
    const entryChanged = ({ ordinal, value }) => value ? onEntry(pin.concat(value)) : onEntry(pin.slice(0, ordinal))
    return (
      <div>
        {generateArray(maxDigits).map(x => (
          <div key={x} style={containerStyle}>
            <input type="password" autoComplete="new-password" onChange={({ target: { value } }) => entryChanged({ ordinal: x, value })} value={pin[x] || ''} />
          </div>
        ))}
      </div>
    )
  }

  const PinPad = ({ pin = [], onEntry, maxDigits, theme }) => {
    return (
      <div>PinPad needs work!</div>
    )
  }


  return class Pin extends Component {
    static propsTypes = { validate: PropTypes.func.isRequired
                        , onEntry: PropTypes.func.isRequired
                        , onSuccess: PropTypes.func.isRequired
                        , type: PropTypes.string.oneOf(['horizontal', 'pad']).isRequired
                        , minDigits: PropTypes.number.isRequired
                        , maxDigits: PropTypes.number.isRequired
                        , title: PropTypes.string.isRequired
                        , message: PropTypes.string.isRequired
                        , containerStyle: PropTypes.object.isRequired
                        , titleStyle: PropTypes.object.isRequired
                        , messageStyle: PropTypes.object.isRequired
                        , theme: PropTypes.oneOf(['solarized', 'shield', 'carbon']).isRequired
                        };
    static defaultProps = { type: 'horizontal'
                          , onEntry: pin => {}
                          , minDigits: 1
                          , maxDigits: 4
                          , title: 'Locked'
                          , message: 'Enter your pin to continue.'
                          , containerStyle: {}
                          , titleStyle: {}
                          , messageStyle: {}
                          , theme: 'solarized'
                          };
    constructor() {
      this.state = { pin: [] }
    }
    render() {
      const { validate, type, minDigits, onEntry, onSuccess, title, message, containerStyle, titleStyle, messageStyle, ...viewProps } = this.props

      const handleEntry = pin => {
        if(pin.length >= minDigits)
          return validate(pin) ? onSuccess(pin) : onEntry(pin)
        this.setState({ pin })
      }

      return (
        <div style={containerStyle}>
          <div style={titleStyle}>{title}</div>
          <div style={messageStyle}>{message}</div>
          {type === 'horizontal' ? <PinHorizontal {...viewProps} onEntry={handleEntry} pin={this.state.pin} /> : null}
          {type === 'pad' ? <PinPad {...viewProps} onEntry={handleEntry} pin={this.state.pin} /> : null}
        </div>
      )
    }


  }
}
