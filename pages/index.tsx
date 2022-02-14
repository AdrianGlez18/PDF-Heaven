import type { NextPage } from 'next'
import { Box, Container, Heading, Image, HStack, VStack, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import { JustifiedText } from '../components/emotionComponents';
import BlockSection from '../components/BlockSection';

// @ts-nocheck
const HomePage: NextPage = () => {

    const { colorMode } = useColorMode()

    return (
        <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
                <Box bg="transparent">
                    <BlockSection>
                    <VStack>
                        <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mt={30}> Home </Heading>
                        <JustifiedText>
                                Welcome to PDF Heaven! A free and Open Source web app made with NextJS to work with PDF files. This web is currently in development, so it does not include all functions yet. It can also have some bugs, so please be patient.
                            </JustifiedText>
                            <JustifiedText>
                                Check out our tools to work with PDF in the tools section.
                            </JustifiedText>
                    </VStack>
                    </BlockSection>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;