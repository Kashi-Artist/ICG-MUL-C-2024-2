// Obtener el elemento canvas y su contexto de dibujo 2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawFigure() {
    const figureSelect = document.getElementById('figureSelect').value;
    const xCoord = parseFloat(document.getElementById('xCoord').value);
    const yCoord = parseFloat(document.getElementById('yCoord').value);
    const size = parseFloat(document.getElementById('size').value);
    const height = parseFloat(document.getElementById('height').value) || size;

    if (isNaN(xCoord) || isNaN(yCoord) || isNaN(size)) {
        alert('Por favor, ingresa valores válidos para todas las variables.');
        return;
    }

    // Limpiar canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (figureSelect === 'circle') {
        // Dibujar círculo
        ctx.beginPath();
        ctx.arc(xCoord, yCoord, size, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    } else if (figureSelect === 'square') {
        // Dibujar cuadrado
        ctx.beginPath();
        ctx.rect(xCoord, yCoord, size, size);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    } else if (figureSelect === 'rectangle') {
        // Dibujar rectángulo
        ctx.beginPath();
        ctx.rect(xCoord, yCoord, size, height);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    } else if (figureSelect === 'triangle') {
        // Dibujar triángulo
        ctx.beginPath();
        ctx.moveTo(xCoord, yCoord);
        ctx.lineTo(xCoord + size, yCoord);
        ctx.lineTo(xCoord + size / 2, yCoord - height);
        ctx.closePath();
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    } else {
        alert('Selecciona una figura.');
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function exit() {
    alert('Saliendo.');
    // Puedes redirigir a otra página si lo deseas
    window.location.href = "about:blank"; // Redirige a una página en blanco
}

// Mostrar campo de altura si se selecciona un rectángulo o triángulo
document.getElementById('figureSelect').addEventListener('change', function() {
    const figureSelect = this.value;
    const heightField = document.getElementById('heightField');
    if (figureSelect === 'rectangle' || figureSelect === 'triangle') {
        heightField.style.display = 'block';
    } else {
        heightField.style.display = 'none';
    }
});
