# Around the U.S.

## Descripción

Página interactiva donde los usuarios pueden ver y editar su perfil, y explorar una galería de tarjetas fotográficas de distintos lugares.

## Funcionalidad

- Diseño responsivo (320px - 1280px) siguiendo la metodología BEM.
- Ventana emergente para editar el nombre y la descripción del perfil.
- Galería de tarjetas fotográficas cargadas desde una API.
- Ventana emergente para agregar una nueva tarjeta (nombre + enlace a la imagen).
- Botón de "me gusta" y eliminación de tarjetas conectados al servidor.
- Ventana emergente para ver la imagen de una tarjeta ampliada.
- Actualización de la foto de perfil y confirmación antes de eliminar una tarjeta.

## Tecnologías y técnicas

- HTML5 semántico.
- CSS3 (Flexbox, Grid, metodología BEM).
- JavaScript modular con clases para tarjetas, ventanas emergentes, formularios, sección de tarjetas, información de usuario y solicitudes a la API.
- Elementos `<template>` para renderizar las tarjetas.

## Estructura de JavaScript

- `src/components/`: contiene las clases `Api`, `Card`, `FormValidator`, `Section`, `Popup`, `PopupWithImage`, `PopupWithForm`, `PopupWithConfirmation` y `UserInfo`.
- `src/pages/index.js`: crea las instancias y conecta los eventos de la página.
- `src/blocks/`: reúne los estilos BEM de cada bloque.
- `src/images/`: contiene las imágenes y los íconos del proyecto.

## Mi sitio: https://luisjuarez95.github.io/web_project_around/
