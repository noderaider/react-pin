# [react-pin](https://npmjs.com/packages/react-pin)

[![NPM](https://nodei.co/npm/react-pin.png?stars=true&downloads=true)](https://nodei.co/npm/react-pin/)

React overlay component for transitions and lock screens.

`npm i -S react-pin`


**This project is working but its interface may change rapidly prior to version 1.0.**


### What's it do?

Exports a component that can be used in lock screens or page transitions.


### Usage

```js
/** Import reactPin factory */
import reactPin from 'react-pin'

import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import classNames from 'classnames'
import { assert } from 'chai'

/** Translate the factory to a Pin component, ensures you don't accidentally bundle two versions of popular libraries. */
const Pin = reactPin({ React, ReactCSSTransitionGroup, classNames, assert })

/** Wrap pin with one of your components to set its props. */
export default props => (
  <Pin
      maxDigits={4}
      minDigits={4}
      validate={pin => pin === [1,2,3,4]}
      title="Enter Pin"
      successMessage="That was the correct pin!"
      failureMessage="That was the wrong pin!"
      onSuccess={() => console.info('APP UNLOCKED')}
      onFailure={() => console.warn('WRONG PIN ENTERED')}
      theme="solarized"
  />
)
```

### PropTypes and DefaultProps


```js
Pin.propTypes = { validate: PropTypes.func.isRequired
                , maxDigits: PropTypes.number.isRequired
                , minDigits: PropTypes.number.isRequired
                , title: PropTypes.string
                , successMessage: PropTypes.string
                , failureMessage: PropTypes.string
                , onSuccess: PropTypes.func.isRequired
                , onFailure: PropTypes.func
                , theme: PropTypes.oneOf(['solarized', 'shield', 'carbon']).isRequired
                }
```

```js
Pin.defaultProps =  { maxDigits: 4
                    , minDigits: 4
                    , title: 'Enter Pin'
                    , successMessage: 'Success!'
                    , failureMessage: 'Incorrect Pin!'
                    , theme: 'carbon'
                    }
```
