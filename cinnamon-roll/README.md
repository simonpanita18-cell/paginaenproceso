# Cinnamon Roll 🍥 — página para Agustina

Página personal de una sola vista (one-page), con backend mínimo en Spring Boot
que solo sirve el sitio y expone un pequeño endpoint para las frases del
cinnamon roll interactivo.

## Estructura

```
cinnamon-roll/
├── pom.xml
├── README.md
└── src/main/
    ├── java/com/simon/cinnamonroll/
    │   ├── CinnamonRollApplication.java   -> arranca la app
    │   └── controller/FraseController.java -> GET /api/frases
    └── resources/
        ├── application.properties
        └── static/
            ├── index.html   -> toda la página (todas las secciones)
            ├── css/style.css
            ├── js/script.js
            └── images/      -> aquí van tus fotos/recuerdos
```

## Cómo ejecutarlo

Necesitas **Java 21** y **Maven** instalados (o usa el wrapper si lo agregas).

```bash
cd cinnamon-roll
mvn spring-boot:run
```

Luego abre: **http://localhost:8080**

Para generar un `.jar` ejecutable:

```bash
mvn clean package
java -jar target/cinnamon-roll.jar
```

> Nota: como todo el contenido vive en `static/`, si solo quieres ver el diseño
> rápido sin correr Java, también puedes abrir `src/main/resources/static/index.html`
> directamente en el navegador. Lo único que no funcionará sin el backend es el
> endpoint `/api/frases` — el JS ya tiene una lista de respaldo para ese caso,
> así que el cinnamon roll interactivo sigue funcionando igual.

## Cómo modificar los textos

Todo el texto visible está en `src/main/resources/static/index.html`, dividido
por comentarios `<!-- N. NOMBRE DE SECCIÓN -->`. Cada sección es un `<section>`
independiente, así que puedes buscar el bloque por su `id` (`#hero`, `#intro`,
`#siento`, `#confesion`, `#quiero`, `#recuerdos`, `#interactivo`, `#carta`, `#final`)
y editar el texto directamente, sin tocar el CSS ni el JS.

Las frases del cinnamon roll interactivo están en dos lugares (mantenlos iguales
si los cambias):
- `FraseController.java` (lista `FRASES`) — se usa cuando corre el backend.
- `script.js` (constante `FRASES_RESPALDO`) — se usa si se abre el HTML sin backend.

## Dónde colocar imágenes

1. Copia tus fotos a `src/main/resources/static/images/`.
2. En `index.html`, busca la sección `#recuerdos`. Cada tarjeta tiene un
   `<div class="memory-placeholder">` con un ícono — reemplázalo por:
   ```html
   <img src="images/tu-foto.jpg" alt="descripción del recuerdo">
   ```
3. El CSS ya tiene el tamaño y las esquinas redondeadas listas
   (`.memory-placeholder` en `style.css`); una `<img>` con esa misma clase
   hereda el mismo estilo si le agregas `style="width:100%;height:100%;object-fit:cover;"`
   o defines una clase `.memory-photo { width:100%; height:100%; object-fit:cover; border-radius: var(--radius-md); }`.

## Cómo agregar nuevos recuerdos

En `index.html`, dentro de `.memories-grid`, copia un bloque `.memory-card`
completo y pégalo debajo, cambiando el texto del `<h4>` y la imagen/ícono.
El grid es automático (`grid-template-columns: repeat(auto-fit, ...)`), así
que se acomoda solo sin tocar el CSS.

## Cómo cambiar los colores

Todos los colores están centralizados como variables CSS al inicio de
`style.css`, dentro de `:root`:

```css
:root {
  --crema: #FBF3E7;
  --blanco-calido: #FFFDF8;
  --beige: #F0E1C9;
  --caramelo: #C98A4B;
  --caramelo-oscuro: #A9703A;
  --rosa-suave: #F3D9D2;
  --cafe-texto: #5B3A29;
  --cafe-suave: #8C6A50;
}
```

Cambia cualquiera de esos valores hexadecimales y se actualiza en toda la
página automáticamente (tarjetas, botones, títulos, fondos, etc.).

## Detalles de diseño

- **Tipografías:** Fraunces (títulos, cálida y con carácter) + Quicksand
  (texto, redondeada y suave) + Caveat (solo en la carta final, para que
  se sienta escrita a mano).
- **Animaciones:** revelado suave al hacer scroll (`IntersectionObserver`),
  partículas ambientales muy discretas, cinnamon roll SVG interactivo que
  lanza frases en burbujas alrededor al hacer clic. Todo respeta
  `prefers-reduced-motion`.
- **Responsive:** grids con `auto-fit`/`minmax` que se acomodan solos en
  celular, tablet y escritorio; tipografía con `clamp()` para que los
  títulos no se corten en pantallas chicas.

## Notas

No hay base de datos ni configuración adicional: es intencionalmente simple,
tal como se pidió. El único endpoint del backend (`/api/frases`) es opcional
para el funcionamiento del sitio — solo enriquece la parte interactiva.
