import { reactive, watch } from 'vue';
import type { Product } from '@/types/Product';

const loadInventory = (): Product[] => {
  const data = localStorage.getItem('inventory');
  return data ? JSON.parse(data) : [];
};

export function useInventory() {
  const products: Product[] = reactive(
    loadInventory().length
      ? loadInventory()
      : [
        { id: 1, nombre: '📱 Smartphone', precio: 699, stock: 15, disponible: true },
        { id: 2, nombre: '🎧 Auriculares Bluetooth', precio: 59, stock: 20, disponible: true },
        { id: 3, nombre: '📺 Monitor 24"', precio: 199, stock: 5, disponible: true },
        { id: 4, nombre: '⌨️ Teclado Mecánico', precio: 120, stock: 8, disponible: true },
        { id: 5, nombre: '🖱️ Mouse Gamer', precio: 45, stock: 12, disponible: true },
      ]
  );

  const saveToLocalStorage = (): void => {
    localStorage.setItem('inventory', JSON.stringify(products));
  };

  watch(
    () => products.map((p) => p.stock),
    () => {
      products.forEach((p) => {
        p.disponible = p.stock > 0;
      });
      saveToLocalStorage();
    },
    { deep: true }
  );

  const addProduct = (product: Product) => {
    products.push({ ...product, id: products.length + 1 });
    saveToLocalStorage();
  };

  const editProduct = (updatedProduct: Product) => {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = { ...updatedProduct };
      saveToLocalStorage();
    }
  };

  const deleteProduct = (productId: number) => {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      saveToLocalStorage();
    }
  };

  return { products, addProduct, editProduct, deleteProduct };
}
