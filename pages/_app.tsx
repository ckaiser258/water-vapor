import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Component {...pageProps} />
        </ApolloProvider>
      </NextAuthProvider>
    </>
  );
}
export default MyApp;
