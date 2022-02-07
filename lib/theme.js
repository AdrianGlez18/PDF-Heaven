import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#edf5e1', '#05386b')(props)
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 30,
        textUnderlineOffset: 8,
        textDecorationColor: 'lightBg',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
        paddingTop: 5,
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  deepBlue:   '#05386b',
  deepGreen:  '#379683',
  midGreen:   '#5cdb95',
  lightGreen: '#8ee4af',
  lightBg:    '#edf5e1',
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
