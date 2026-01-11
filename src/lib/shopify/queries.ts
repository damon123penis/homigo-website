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
    productByHandle(handle: $handle) {
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
          { namespace: "custom", key: "mpn" }
          { namespace: "custom", key: "garantie" }
          { namespace: "custom", key: "funkstandard" }
          { namespace: "custom", key: "frequenz" }
          { namespace: "custom", key: "hub_erforderlich" }
          { namespace: "custom", key: "hub_kompatibilitaet" }
          { namespace: "custom", key: "oecosysteme" }
          { namespace: "custom", key: "thread" }
          { namespace: "custom", key: "matter" }
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
            quantityAvailable
            sku
            barcode
            image { url altText }
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
export const GET_PRODUCTS = /* GraphQL */ `
  query Products($first: Int!, $query: String!, $productFilters: [ProductFilter!]) {
    search(query: $query, first: $first, types: [PRODUCT], productFilters: $productFilters) {
      productFilters {
        id
        label
        type
        values {
          id
          label
          count
          input
        }
      }
      edges {
        node {
          ... on Product {
            id
            handle
            title
            vendor
            featuredImage { url altText }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;