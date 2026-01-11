export const GET_COLLECTIONS = /* GraphQL */ `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText }
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { url altText }
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            featuredImage { url altText }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            metafields(
              identifiers: [
                { namespace: "custom", key: "steuerregime" }
                { namespace: "custom", key: "steuerhinweis_anzeige" }
                { namespace: "custom", key: "zustand" }
              ]
            ) {
              key
              namespace
              type
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      vendor
      featuredImage { url altText }
      metafields(
        identifiers: [
          { namespace: "custom", key: "steuerregime" }
          { namespace: "custom", key: "steuerhinweis_anzeige" }
          { namespace: "custom", key: "zustand" }
        ]
      ) {
        key
        namespace
        type
        value
      }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title handle }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title handle }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
        cost { subtotalAmount { amount currencyCode } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title handle }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
        cost { subtotalAmount { amount currencyCode } }
      }
      userErrors { field message }
    }
  }
`;