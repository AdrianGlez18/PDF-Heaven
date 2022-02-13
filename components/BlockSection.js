import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const AnimatedDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const BlockSection = ({ children, delay = 0 }) => (
  <AnimatedDiv
    initial={{ y: 15, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, delay }}
    mb={6}
  >
    {children}
  </AnimatedDiv>
)

export default BlockSection

