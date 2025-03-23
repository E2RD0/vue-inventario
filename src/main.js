import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Asegura que se carguen los estilos
import '@mdi/font/css/materialdesignicons.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configuración de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount('#app');
