import React from 'react';
import { GetStaticPropsContext } from 'next';
import { initializeGraphQL, graphQLRequest } from '../../graphql';
import { ProductPageContent } from '../../components';

const ProductPage = ({ product }: any) => {
  return <ProductPageContent product={product} />;
};

export async function getStaticPaths() {
  const query = `query getProductPaths($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
        }
      }
    }   
  }`;

  const queryOptions = {
    variables: { first: 25 },
  };

  const client = initializeGraphQL();

  let res: any;

  try {
    res = await graphQLRequest(client, query, queryOptions);
  } catch (err) {
    console.log((err as Error).message);
  }

  const products = res.data.products.edges;

  const paths = products.map((product: any) => {
    const handle = String(product.node.handle);
    return { params: { product: handle } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const client = initializeGraphQL();

  const query = `query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url,
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            priceV2 {
              amount
            }
          }
        }
      }
    }   
  }`;

  const queryOptions = {
    variables: { handle: params && params.product },
  };

  let res: any;

  try {
    res = await graphQLRequest(client, query, queryOptions);
  } catch (err) {
    console.log((err as Error).message);
  }

  return {
    props: {
      product: res.data.product,
    },
  };
}

export default ProductPage;
