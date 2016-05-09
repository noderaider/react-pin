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

export default dependencies => {
  const { assert, classNames, React, ReactCSSTransitionGroup } = dependencies
  const { Component, PropTypes } = React

}
