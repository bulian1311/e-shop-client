import React, { FC } from 'react';
import { initializeGraphQL, graphQLRequest } from '../graphql';

const Home: FC<any> = ({ products }) => {
  console.log(products);

  return (
    <div>
      <h1 className="text-2xl">hello</h1>
    </div>
  );
};

export async function getStaticProps() {
  const GET_PRODUCTS_ON_HOMEPAGE = `query getInCollection($first: Int!) {
    collection(handle: "frontpage") {
      title
      products(first: $first) {
        edges {
          node{
            id
            title
            handle
            images(first:5){
              edges{
                node{
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`;

  const queryOptions = {
    variables: { first: 10 },
  };

  const client = initializeGraphQL();
  let res: any;
  try {
    res = await graphQLRequest(client, GET_PRODUCTS_ON_HOMEPAGE, queryOptions);
  } catch (err) {
    console.log((err as Error).message);
  }

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
      products: res.data.collection.products.edges,
    },
    revalidate: 1,
  };
}

export default Home;
