# Metro

Metro es un ejercicio que resuelve la mejor ruta entre dos estaciones según la red del metro y el color del tren. Está construido en Node.js.

## Instalación

Se requieren instalar las siguientes librerías para la ejecución de tests.

```bash
npm install mocha chai
```

## Creación de redes del metro
Se debe editar el archivo **entradas.txt** con la siguiente información:
1. Primera línea del archivo: se deben ingresar todos los tramos posibles separados por punto y coma (;), además las estaciones de cada tramo se deben separar por coma (,).
2. Segunda línea del archivo: se deben identificar las estaciones verdes y rojas, separadas por punto y coma (;). Las estaciones de un mismo color se deben separar por coma (,).

Ejemplo de archivo:

```
A,B;B,C;C,D;D,E;E,F;F,I;I,H;H,G;G,C
G,I;H
```

## Cómo usar
Para ejecutar el programa con un caso de ejemplo se debe correr el comando:

```bash
npm start
```

## Cómo testear
Para testear las pruebas unitarias se debe correr el comando:

```bash
npm test
```