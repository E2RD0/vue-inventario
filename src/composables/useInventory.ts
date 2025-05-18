import { ref } from 'vue';
import type { Product } from '../types/Product';
import axios from 'axios';

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const GRAPHQL_URL = `${import.meta.env.VITE_API_URL}/graphql`;

export function useInventory() {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const query = `
        query {
          allProducts {
            id
            name
            price
            stock
            available
          }
        }
      `;

      const res = await axios.post(GRAPHQL_URL, { query });
      products.value = res.data.data.allProducts;
    } catch (err) {
      error.value = 'Failed to load products.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'available'>) => {
    try {
      const query = `
        mutation($id: Int!, $name: String!, $price: Float!, $stock: Int!) {
          addProduct(id: $id, name: $name, price: $price, stock: $stock) {
            product {
              id
              name
              price
              stock
              available
            }
          }
        }
      `;

      const id = products.value.length
        ? Math.max(...products.value.map((p) => p.id)) + 1
        : 1;

      await axios.post(GRAPHQL_URL, {
        query,
        variables: {
          id,
          name: product.name,
          price: product.price,
          stock: product.stock,
        },
      });

      await fetchProducts();
    } catch (err) {
      error.value = 'Failed to add product.';
      console.error(err);
    }
  };

  const updateProduct = async (id: number, name?: string, price?: number) => {
    try {
      const query = `
        mutation($id: Int!, $name: String, $price: Float) {
          updateProduct(id: $id, name: $name, price: $price) {
            product {
              id
              name
              price
              stock
              available
            }
          }
        }
      `;

      await axios.post(GRAPHQL_URL, {
        query,
        variables: { id, name, price },
      });

      await fetchProducts();
    } catch (err) {
      error.value = 'Failed to update product.';
      console.error(err);
    }
  };

  const updateStock = async (productId: number, quantity: number) => {
    try {
      const query = `
        mutation($productId: Int!, $quantity: Int!) {
          updateStock(productId: $productId, quantity: $quantity) {
            product {
              id
              stock
              available
            }
          }
        }
      `;

      await axios.post(GRAPHQL_URL, {
        query,
        variables: { productId, quantity },
      });

      await fetchProducts();
    } catch (err) {
      error.value = 'Failed to update stock.';
      console.error(err);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const query = `
        mutation($productId: Int!) {
          deleteProduct(productId: $productId) {
            ok
          }
        }
      `;

      await axios.post(GRAPHQL_URL, {
        query,
        variables: { productId },
      });

      await fetchProducts();
    } catch (err) {
      error.value = 'Failed to delete product.';
      console.error(err);
    }
  };

  fetchProducts();

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateStock,
    updateProduct,
    deleteProduct,
  };
}
