import { mode } from '@chakra-ui/theme-tools'
import Link from 'next/link';
import { Box, Container, Heading, Image, HStack, VStack } from "@chakra-ui/react";

export const getLightHome = () => {
    return <Box mb={5}>
        <Link href={'/'}>
        <Image
            
            maxWidth="200px"
            display="inline-block"
            borderRadius="full"
            src="logo-light.png"
            alt="Profile image"
        />
        </Link>
    </Box>
}

export const getDarkHome = () => {
    return <Box mb={5}>
        <Link href={'/'}>
        <Image
            
            maxWidth="200px"
            display="inline-block"
            borderRadius="full"
            src="logo-dark.png"
            alt="Profile image"
        />
        </Link>
    </Box>
}

