import * as React from 'react'
import { globalStyles } from './stitches/global-styles'

function compose(configs: React.JSXElementConstructor<any>[], children: JSX.Element) {
  return configs.reverse().reduce((acc, Config) => {
    return <Config>{acc}</Config>
  }, children)
}

interface ConfigProps {
  children: JSX.Element
}

function Config(props: ConfigProps) {
  globalStyles()

  return compose([], props.children)
}

export { Config }
