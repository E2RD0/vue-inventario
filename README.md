# Inventario Vue

## Preguntas y Respuestas sobre Reactividad en Vue.js

## 1. Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?

Vue no detecta cambios en propiedades anidadas dentro de objetos reactivos porque `reactive()` no rastrea cambios en profundidad automáticamente. Para observar estos cambios, se debe usar `watch()` apuntando a la propiedad específica o configurar la opción `deep: true` cuando se trate de objetos completos.

---

## 2. `watch()` permite escuchar cambios en propiedades específicas dentro de `reactive()`, explica cómo funciona.

`watch()` permite observar cambios en una propiedad reactiva y ejecutar una función cuando esta cambia. Se debe pasar una función que acceda a la propiedad deseada y un callback que maneje la actualización. Para objetos anidados, se usa la opción `deep: true`.

---

## 3. ¿Cómo harías que un `watch()` detecte cambios en `stock` dentro de un array de productos?

Para detectar cambios en `stock` dentro de un array de productos, se usa `watch()` observando el array completo con la opción `deep: true`, ya que `watch()` por defecto no detecta modificaciones en propiedades internas de los objetos dentro del array.

