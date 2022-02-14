import { Box, Container, Heading, Image, HStack, VStack, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import Link from "next/link";
import { getDarkHome, getLightHome } from "../lib/imageMode";
import ThemeButton from '../components/themeButton';

const NavBar = () => {

    const { colorMode } = useColorMode()

    return (

        <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
                <Box bg="transparent" align="center">
                    
                    {
                        // Choose the image based on current theme :)
                        colorMode === 'light' ? getLightHome() : getDarkHome()
                    }
                    
                    <VStack>
                        <HStack spacing={4} mt={5}>
                            <Link href={'/tools'}>
                            <Box borderRadius="lg" bg={colorMode === "dark" ? 'lightGreen' : 'deepGreen'} p={3}  >
                                <Text color={colorMode === "dark" ? 'deepBlue' : 'lightBg'}>Tools</Text>
                            </Box>
                            </Link>
                            <Link href={'/about'}>
                            <Box borderRadius="lg" bg={colorMode === "dark" ? 'lightGreen' : 'deepGreen'} p={3} >
                                <Text color={colorMode === "dark" ? 'deepBlue' : 'lightBg'}>About</Text>
                            </Box>
                            </Link>
                            <Box borderRadius="lg" bg={colorMode === "dark" ? 'lightGreen' : 'deepGreen'} p={3} >
                                <Text color={colorMode === "dark" ? 'deepBlue' : 'lightBg'}>Support</Text>
                            </Box>
                            <ThemeButton />
                        </HStack>
                    </VStack>
                </Box>
            </Box>
        </Box>

    )
}

export default NavBar;

//<Heading as="h1" size="2xl" fontWeight="bold" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} >PDF Heaven Resources</Heading>