<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5">
        <v-icon class="mr-2">mdi-package-variant</v-icon>
        Inventario
      </v-card-title>
      <v-card-subtitle class="mb-4">Administra el stock de los productos</v-card-subtitle>

      <v-btn color="primary" class="mb-4" @click="openAddDialog">
        <v-icon left>mdi-plus</v-icon>
        Agregar Producto
      </v-btn>

      <v-list>
        <ProductItem
          v-for="producto in products"
          :key="producto.id"
          :producto="producto"
          @edit="openEditDialog"
          @delete="deleteProduct"
          @refresh="fetchProducts"
        />
      </v-list>
    </v-card>

    <!-- Modal para agregar/editar productos -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          {{ isEditing ? "Editar Producto" : "Agregar Producto" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="product.name" label="Nombre" required />
            <v-text-field v-model.number="product.price" label="Precio" type="number" required />
            <v-text-field v-model.number="product.stock" label="Stock" type="number" :min="0" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="saveProduct">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInventory } from "@/composables/useInventory";
import ProductItem from "@/components/ProductItem.vue";
import type { Product } from "@/types/Product";

const {
  products,
  addProduct,
  updateStock,
  updateProduct,
  deleteProduct,
  fetchProducts
} = useInventory();

const dialog = ref(false);
const isEditing = ref(false);
const product = ref<Partial<Product>>({
  id: 0,
  name: "",
  price: 0,
  stock: 0,
});

const openAddDialog = () => {
  isEditing.value = false;
  product.value = { name: "", price: 0, stock: 0 };
  dialog.value = true;
};

const openEditDialog = (prod: Product) => {
  isEditing.value = true;
  product.value = { ...prod };
  dialog.value = true;
};

const saveProduct = async () => {
  if (!product.value.name || !product.value.price || product.value.stock == null) return;

  if (isEditing.value && product.value.id != null) {
    const original = products.value.find((p) => p.id === product.value.id);
    if (original) {
      const updates: Promise<any>[] = [];

      const stockDiff = product.value.stock! - original.stock;
      if (stockDiff !== 0) {
        updates.push(updateStock(product.value.id, stockDiff));
      }

      const nameChanged = product.value.name !== original.name;
      const priceChanged = product.value.price !== original.price;
      if (nameChanged || priceChanged) {
        updates.push(updateProduct(product.value.id, product.value.name, product.value.price));
      }

      await Promise.all(updates);
    }
  } else {
    await addProduct({
      name: product.value.name!,
      price: product.value.price!,
      stock: product.value.stock!,
    });
  }

  dialog.value = false;
};
</script>
