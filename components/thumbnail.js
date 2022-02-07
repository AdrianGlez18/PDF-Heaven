import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'

const Thumbnail = ({ children, href, title, imageSource }) => (
    <Box w="100%" textAlign="center">
      <LinkBox cursor="pointer">
        <Image
          src={imageSource}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
          width="200px"
          height={200}
        />
        <LinkOverlay href={href}>
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  )

  export default Thumbnail