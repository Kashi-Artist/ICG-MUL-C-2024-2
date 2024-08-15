// Obtener el elemento canvas y su contexto de dibujo 2D
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Configuración del círculo
const xCirculo = 150; // Posición X del círculo
const yCirculo = 150; // Posición Y del círculo
const radioCirculo = 100; // Radio del círculo

// Configuración del cuadrado
const xCuadrado = 300; // Posición X del cuadrado
const yCuadrado = 300; // Posición Y del cuadrado
const tamañoCuadrado = 100; // Tamaño del cuadrado

// Dibujar el círculo
ctx.beginPath(); // Comenzar un nuevo camino
ctx.arc(xCirculo, yCirculo, radioCirculo, 0, Math.PI * 2); // Crear el arco del círculo
ctx.fillStyle = 'blue'; // Color de relleno del círculo
ctx.fill(); // Rellenar el círculo
ctx.strokeStyle = 'black'; // Color del borde del círculo
ctx.stroke(); // Dibujar el borde del círculo

// Dibujar el cuadrado
ctx.beginPath(); // Comenzar un nuevo camino
ctx.rect(xCuadrado, yCuadrado, tamañoCuadrado, tamañoCuadrado); // Crear el rectángulo (cuadrado)
ctx.fillStyle = 'red'; // Color de relleno del cuadrado
ctx.fill(); // Rellenar el cuadrado
ctx.strokeStyle = 'black'; // Color del borde del cuadrado
ctx.stroke(); // Dibujar el borde del cuadrado
