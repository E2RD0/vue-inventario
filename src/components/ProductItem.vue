<template>
  <v-list-item class="product-item">
    <v-row align="center">
      <!-- Product Info -->
      <v-col cols="12">
        <v-list-item-title class="text-h6">
          {{ producto.name }} - ${{ producto.price }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Stock: <strong>{{ producto.stock }}</strong>
          <span :class="producto.available ? 'text-green' : 'text-red'">
            ({{ producto.available ? "Disponible" : "No disponible" }})
          </span>
        </v-list-item-subtitle>
      </v-col>

      <!-- Edit & Delete Buttons -->
      <v-col cols="6" class="d-flex mt-2">
        <v-btn icon color="#FB8C00" size="small" @click="$emit('edit', producto)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="#D32F2F" size="small" class="ml-2" @click="$emit('delete', producto.id)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-col>

      <!-- Stock Control Buttons -->
      <v-col cols="6" class="d-flex justify-end">
        <v-btn icon color="#757575" size="large" rounded="lg" elevation="3"
               @click="changeStock(-1)" :disabled="producto.stock <= 0">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn icon color="#1976D2" size="large" class="ml-2" rounded="lg" elevation="3"
               @click="changeStock(1)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script setup lang="ts">
import type { Product } from "@/types/Product";
import { defineProps, defineEmits } from "vue";
import { useInventory } from "@/composables/useInventory";

const props = defineProps<{ producto: Product }>();
const emit = defineEmits(["edit", "delete", "refresh"]);

const { updateStock } = useInventory();

const changeStock = async (amount: number) => {
  await updateStock(props.producto.id, amount);
  emit("refresh");
};
</script>

<style scoped>
.text-green {
  color: #388e3c;
  font-weight: bold;
}
.text-red {
  color: #d32f2f;
  font-weight: bold;
}
.product-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px;
}
</style>
