import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as NextAuthProvider } from "next-auth/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// Configure Apollo client
const httpLink = createHttpLink({
  uri: "/api",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </NextAuthProvider>
  );
}
export default MyApp;
