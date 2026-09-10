# Around the U.S.

## Descripción

Página interactiva donde los usuarios pueden ver y editar su perfil, y explorar una galería de tarjetas fotográficas de distintos lugares.

## Funcionalidad

- Diseño responsivo (320px - 1280px) siguiendo la metodología BEM.
- Ventana emergente para editar el nombre y la descripción del perfil.
- Galería de tarjetas fotográficas renderizadas por JavaScript a partir de un arreglo de datos.
- Ventana emergente para agregar una nueva tarjeta (nombre + enlace a la imagen).
- Botón de "me gusta" en cada tarjeta.
- Botón para eliminar tarjetas.
- Ventana emergente para ver la imagen de una tarjeta ampliada.

## Tecnologías y técnicas

- HTML5 semántico.
- CSS3 (Flexbox, Grid, metodología BEM).
- JavaScript modular: clases `Card` y `FormValidator`, manipulación del DOM y eventos.
- Elementos `<template>` para renderizar las tarjetas.

## Estructura de JavaScript

- `scripts/Card.js`: crea y controla cada tarjeta.
- `scripts/FormValidator.js`: valida los formularios.
- `scripts/utils.js`: contiene las funciones para abrir y cerrar ventanas modales.
- `scripts/index.js`: conecta los datos, formularios y clases con la página.

## Mi sitio: https://luisjuarez95.github.io/web_project_around/
