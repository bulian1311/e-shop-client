const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const domain = process.env.SHOPIFY_STORE_DOMAIN;

async function shopifyData(query: any) {
  const URL = `https://${domain}/api/2022-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontToken || '',
      'Content-Type': 'application/graphql',
    },
    body: query,
  };

  try {
    const data = await fetch(URL, options).then((res) => {
      return res.json();
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProguctsInCollection() {
  const query = `{
    collection(handle: "frontpage") {
      title
      products(first:5) {
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

  const res = await shopifyData(query);
  const products = res.data.products.edges ? res.data.products.edges : [];

  return products;
}
