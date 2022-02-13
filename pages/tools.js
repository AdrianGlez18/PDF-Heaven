import { Box, Container, Heading, Image, HStack, VStack, Text, SimpleGrid, Divider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import styled from "@emotion/styled";
import { getDarkHome, getLightHome } from "../lib/imageMode";
import ThemeButton from '../components/themeButton';
import Thumbnail from "../components/thumbnail";
import imagepdf from '../public/imagepdf.png';
import pdfjoin from '../public/pdfjoin.png';
import BlockSection from "../components/BlockSection";

const ToolsPage = () => {

    const { colorMode } = useColorMode()

    return (

        <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
                <Box bg="transparent" align="center">
                    <BlockSection delay={0.2}>
                    <VStack>
                        <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mt={30}> Tools </Heading>
                        <SimpleGrid columns={[1, 2, 3]} gap={6}>
                            <Thumbnail href="/image-to-pdf" imageSource={imagepdf} title="Image to PDF">
                                Convert one or more images to pdf
                            </Thumbnail>
                            <Thumbnail href="/join-pdf" imageSource={pdfjoin} title="Join PDF">
                                Join TWO or more pdfs into one
                            </Thumbnail>
                        </SimpleGrid>
                    </VStack>
</BlockSection>
                </Box>
            </Box>
        </Box>

    )
}

export default ToolsPage;

//<Heading as="h1" size="2xl" fontWeight="bold" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} >PDF Heaven Resources</Heading>