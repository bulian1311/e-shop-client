import React, { FC } from 'react';
import { ProductList } from '../components';
import { initializeGraphQL, graphQLRequest } from '../graphql';

const Home: FC<any> = ({ products }) => {
  return (
    <div>
      <h1 className="text-2xl">hello</h1>
      <ProductList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const query = `query getInCollection($first: Int!) {
    collection(handle: "frontpage") {
      title
      products(first: $first) {
        edges {
          node{
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
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
    res = await graphQLRequest(client, query, queryOptions);
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
