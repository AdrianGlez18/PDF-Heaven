import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import NavBar from "../../components/navbar";

const Main = ({ children, router }) => {
    return (
        <Box as="main" pb={8}>
            <Head>
                <title>PDF Heaven - Home </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>



            <Container maxW="container.lg" pt={14}>
                <NavBar />
                {children}
            </Container>
        </Box>
    )
}

export default Main;

//<Navbar path={router.asPath} />