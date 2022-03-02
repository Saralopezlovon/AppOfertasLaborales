# App ofertas laborales TSR 💼​👨‍💻​👩‍💻​

Página web cuya funcionalidad es encontrar trabajo en el sector de la tecnología a partir de una búsqueda.

La información que aparece la extraemos de diversas páginas web haciendo scraping en el preciso momento en el que se realiza la búsqueda por lo que siempre esta actualizada.

Los usuarios que se registren podrán guardar los anuncios seleccionados en el apartado "Favoritos".

También existe el rol de "Administrador" quien podrá crear anuncios que se guardarán en una BBDD y se mostrarán en las búsquedas.

![imagen](https://github.com/Saralopezlovon/AppOfertasLaborales/blob/main/public/assets/webNoticias.gif)

## Construido con 🛠️

* Arquitectura Server-Side-Rendering

    - Back-end
        - Node
        - Express
        - Mongoose - BBDD no relacional para gestionar los anuncios que se añaden
        - Postgres - BBDD relacional para gestionar los usuarios administradores
        - Autentificación con Auth0
        - Encriptación de contraseñas con bcrypt
        - Sesiones y permisos con coockie-parser y jsonwebtoken
        - Renderizar vistas con Pug
        - Scraping con Puppeteer

    - Css para dar estilo a las vistas

## Autores ✒️

* **Ricardo Zurita** - [ricardozuritadev](https://github.com/ricardozuritadev)
* **Taniu Ojeda** - [TaniuOp](https://github.com/TaniuOp)
* **Sara López** - [Saralopezlovon](https://github.com/Saralopezlovon) 



