import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import NavBar from "../../components/navbar";
import { AnimatePresence, motion } from "framer-motion";

const animationVariants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0, },
    exit: { opacity: 0, x: 0, y: 20 },
}

const Main = ({ children, router }) => {
    return (
        <Box as="main" pb={8}>
            <Head>
                <title>PDF Heaven - Home </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Container maxW="container.lg" pt={14}>
                <NavBar />
                
                    <motion.div initial="hidden" animate="enter" exit="exit" variants={animationVariants} transition={{ duration: 0.5, type: 'easeInOut' }} style={{ position: 'relative' }}>
                        {children}
                    </motion.div>
                

            </Container>
        </Box>
    )
}

export default Main;

//<Navbar path={router.asPath} />