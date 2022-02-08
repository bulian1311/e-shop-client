import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '../hooks';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <>
      <Head>
        <title>E-shop</title>
        <meta name="description" content="E-shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientContext.Provider value={graphQLClient}>
        <Component {...pageProps} />
      </ClientContext.Provider>
    </>
  );
}

export default MyApp;
