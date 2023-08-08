# *Frontend_CEF*

Este proyecto pertenece a :
- Francisco Ramóm Ojeda Casanueva
- Samuel Elias Sanhueza Salas
 Es un software dirigido a solucionar los problemas de la empresa CEF, en específico esta parte corresponde al Frontend del proyecto.

## Tabla de contenidos
1.[Docker](#docker)\
2.[Deploy](#deploy)\
3.[Construido con](#construido-con)
## Docker
#### Pre-requisitos
 - Contar con Docker instalado.q
 - Contar con Git instalado.

#### Instalación

1. Clonamos el repositorio y entramos en el directorio
    ```bash
    git clone https://github.com/Metalcl/Front_CEF
    ```
    ```bash
    cd Front_CEF
    ```

2. Ejecutamos "build", donde [tagName] se remplaza por un nombre a eleccion
    ```bash
    sudo docker build . -t [tagName]
    ```

3. Se ejecuta "run", donde [puertoHost] se reemplaza por un puerto a elecciony [tagName] por el nombre antes elegido
    ```bash
    sudo docker run -d -p [puertoHost]:1515 [tagName]
    ```
## Deploy

#### Pre-requisitos
 - Contar con sistema operativo _"Ubuntu"_

#### Instalacion

1. Verificamos que el sistema esta en su ultima version:
    ```bash
    sudo apt-get update && sudo apt-get upgrade
    ```
2. Instalamos _"curl"_, _"git"_ y _"nano"_:
    ```bash
    sudo apt-get install curl git nano
    ```
3. Añadimos el repositorio de _Node 18_:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    ```
4. Instalamos _Node 18_:
    ```bash
    sudo apt-get install nodejs
    ```
5. Clonamos el repositorio y entramos en este:
    ```bash
    git clone https://github.com/Metalcl/Front_CEF
    ```
    ```bash
    cd Front_CEF
    ```
6. Instalamos las librerias del proyecto:
    ```bash
    npm install
    ```
7. Instalamos _PM2_ de forma global:
    ```bash
    npm install pm2 -g
    ```
8. Modificamos el puerto en **vite.config.js** de acuerdo a nuestras necesidades:
    ```bash
    nano vite.config.js
    ```
    lo que se encuentra en el archivo, cambiamos [puerto] por nuestro puerto a eleccion:
    ```
    server: {
    port: [puerto]
    }
    ```
9. Modificamos el url en  **src/apiConfig.js** de acuerdo a nuestras necesidades de cual es el url de nuestro Backend:
    ```bash
    nano src/apiConfig.js
    ```
    Lo que se encuentra en el archivo, cambiamos [url] por nuestro url al backend a eleccion:
    ```bash
    export const API_URL = '[url]';
    ```
10. Iniciamos el servidor con _PM2_, donde [nombreApp] es el nombre que queramos darle:
    ```bash
    pm2 start npm --name [nombreApp] -- start
    ```
11. Ejecutamos el siguiente comando y ejecutamos el comando que nos devuelva:
    ```bash
    pm2 startup
    ```
    __ejemplo__ del comando devuelto:
    ```bash
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ssanhueza --hp /home/ssanhueza
    ```
12. Guardamos la lista de procesos de _pm2_:
    ```bash
    pm2 save
    ```
## Construido con
- [NodeJS](https://nodejs.org) - Librería de visión artificial
- [PM2](https://www.npmjs.com/package/pm2) - Librería de reconocimiento óptico de caracteres
- [bcrypt](https://openbase.com/js/bcrypt/documentation) - Libreria para encriptar información
- [cors](https://www.npmjs.com/package/cors) - Libreria de control de acceso
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) - Administrador de base de datos
- [Axios](https://axios-http.com/docs/intro) - Libreria de consultas con protocolo http y https
- [Nodemon](https://nodemon.io/) - Monitoreador de cambios
- [Github](https://github.com) - Almacenador de control de versiones
- [Git](https://github.com) - Sistema de control de versiones