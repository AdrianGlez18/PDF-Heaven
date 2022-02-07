import { Box, Container, Heading, Image, HStack, VStack, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';

const HomePage = () => {

    const { colorMode } = useColorMode()

    return (
        <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
                <Box bg="transparent" align="center">
                    <VStack>
                        <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mt={30}> Home </Heading>
                    </VStack>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;