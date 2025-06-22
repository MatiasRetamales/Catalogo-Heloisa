# 🛍️ Catálogo Web con Actualización vía Google Sheets

Este proyecto es una página web estática que funciona como catálogo de productos, donde los datos se cargan dinámicamente desde una hoja de cálculo de Google Sheets. El objetivo fue crear una solución simple y efectiva para una clienta, permitiéndole editar precios y productos sin necesidad de conocimientos técnicos.

## 🚀 Características

- Catálogo dinámico con HTML, CSS y JavaScript.
- Los productos se actualizan automáticamente desde una hoja de Google Sheets.
- Uso de `fetch()` para consumir los datos publicados.
- No requiere backend: ideal para negocios pequeños.
- Responsive y funcional en dispositivos móviles.
- Ideal como CMS ligero.

## 🛠 Tecnologías usadas

- HTML5
- CSS3
- JavaScript
- Google Sheets API (modo "publicar en web")
- Fetch API


## 📝 Cómo funciona

1. Se crea una hoja de cálculo en Google Sheets con las columnas: Nombre, Precio, Imagen, Descripción.
2. Se publica la hoja como "página web" (modo público).
3. El script en JavaScript consume los datos con `fetch()` y los muestra en tarjetas de productos.
4. Cada vez que la clienta actualiza la hoja, el sitio se actualiza automáticamente.

## 👩‍💼 Caso de uso

Este catálogo fue desarrollado para una clienta que necesitaba mostrar sus productos online, pero sin depender de plataformas externas ni sistemas complejos. Gracias a la integración con Google Sheets, puede modificar su catálogo cuando lo necesite sin depender de un desarrollador.