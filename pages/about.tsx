import type { NextPage } from 'next'
import Link from 'next/link';
import { Box, Container, Heading, Image, HStack, VStack, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import BlockSection from '../components/BlockSection';
import { JustifiedText } from '../components/emotionComponents';


const AboutPage: NextPage = () => {

    const { colorMode } = useColorMode()

    return (
        <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
                <Box bg="transparent">
                    <BlockSection>
                        <VStack>
                            <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mt={30}> About </Heading>
                            <JustifiedText>
                                A free and open-source web app made with NextJS to work with PDF.
                            </JustifiedText>
                            <JustifiedText>
                                Check out our <Link href="https://github.com/AdrianGlez18/PDF-Heaven">Github</Link> for the source code!
                            </JustifiedText>
                        </VStack>
                    </BlockSection>
                </Box>
            </Box>
        </Box>
    )
}

export default AboutPage;