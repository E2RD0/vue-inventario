<template>
  <v-list-item class="product-item">
    <v-row align="center">
      <!-- Product Info -->
      <v-col cols="12">
        <v-list-item-title class="text-h6">
          {{ producto.nombre }} - ${{ producto.precio }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Stock: <strong>{{ producto.stock }}</strong>
          <span :class="producto.disponible ? 'text-green' : 'text-red'">
            ({{ producto.disponible ? 'Disponible' : 'No disponible' }})
          </span>
        </v-list-item-subtitle>
      </v-col>

      <!-- Edit & Delete Buttons (Left) -->
      <v-col cols="6" class="d-flex mt-2">
        <v-btn icon color="#FB8C00" size="small" @click="$emit('edit', producto)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="#D32F2F" size="small" class="ml-2" @click="$emit('delete', producto.id)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-col>

      <!-- Stock Control Buttons (Right) -->
      <v-col cols="6" class="d-flex justify-end">
        <v-btn icon color="#757575" size="large" rounded="lg" elevation="3" @click="decreaseStock">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn icon color="#1976D2" size="large" class="ml-2" rounded="lg" elevation="3" @click="increaseStock">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ producto: Product }>();
const emit = defineEmits(['edit', 'delete']);

// Decrease stock function
const decreaseStock = () => {
  if (props.producto.stock > 0) {
    props.producto.stock--;
  }
};

// Increase stock function
const increaseStock = () => {
  props.producto.stock++;
};
</script>

<style scoped>
.text-green {
  color: #388E3C; /* Dark green */
  font-weight: bold;
}
.text-red {
  color: #D32F2F; /* Dark red */
  font-weight: bold;
}
.product-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px;
}
</style>
