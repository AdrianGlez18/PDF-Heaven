import { mode } from '@chakra-ui/theme-tools'
import { Box, Container, Heading, Image, HStack, VStack } from "@chakra-ui/react";

export const getLightHome = () => {
    return <Box mb={5}>
        <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="200px"
            display="inline-block"
            borderRadius="full"
            src="panda.webp"
            alt="Profile image"
        />
    </Box>
}

export const getDarkHome = () => {
    return <Box mb={5}>
        <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="200px"
            display="inline-block"
            borderRadius="full"
            src="cloud.png"
            alt="Profile image"
        />
    </Box>
}

