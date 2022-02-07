/*
    StartDate> 06/02/2022
    FinishDate> Currently Working
*/

import { ChakraProvider } from "@chakra-ui/provider";
import Layout from "@layouts/main";
import theme from "@lib/theme";
import '../styles/globalStyles.css'

const Web = ({ Component, pageProps, router }) => {
    return (
        <ChakraProvider theme={theme}>
            <Layout router={router}>
                <Component {...pageProps} key={router.route}/>
            </Layout>
        </ChakraProvider>
    );
}

export default Web;