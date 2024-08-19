// Obtener el elemento canvas y su contexto de dibujo 2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Función para manejar la selección del sistema de coordenadas
function updateCoordFields() {
    const coordSystem = document.getElementById('coordSystem').value;
    const xCoordField = document.getElementById('xCoordField');
    const yCoordField = document.getElementById('yCoordField');
    const polarCoordFields = document.getElementById('polarCoordFields');
    
    if (coordSystem === 'polar') {
        xCoordField.style.display = 'none';
        yCoordField.style.display = 'none';
        polarCoordFields.style.display = 'block';
    } else {
        xCoordField.style.display = 'block';
        yCoordField.style.display = 'block';
        polarCoordFields.style.display = 'none';
    }
}

function drawFigure() {
    const canvasTitle = document.getElementById('canvasTitle').value;
    const color = document.getElementById('colorPicker').value;
    const coordSystem = document.getElementById('coordSystem').value;
    const figureSelect = document.getElementById('figureSelect').value;
    
    let x, y, size, height;
    
    if (coordSystem === 'polar') {
        const radius = parseFloat(document.getElementById('radius').value);
        const angle = parseFloat(document.getElementById('angle').value) * (Math.PI / 180); // Convertir a radianes
        if (isNaN(radius) || isNaN(angle)) {
            alert('Por favor, ingresa valores válidos para el radio y el ángulo.');
            return;
        }
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);
    } else {
        x = parseFloat(document.getElementById('xCoord').value);
        y = parseFloat(document.getElementById('yCoord').value);
        if (isNaN(x) || isNaN(y)) {
            alert('Por favor, ingresa valores válidos para las coordenadas X e Y.');
            return;
        }
    }
    
    size = parseFloat(document.getElementById('size').value);
    height = parseFloat(document.getElementById('height').value) || size;
    
    if (isNaN(size)) {
        alert('Por favor, ingresa un valor válido para el tamaño.');
        return;
    }

    // Limpiar canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el título en el canvas
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(canvasTitle, canvas.width / 2, 30);

    // Dibujar la figura seleccionada
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';

    if (figureSelect === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (figureSelect === 'square') {
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fill();
        ctx.stroke();
    } else if (figureSelect === 'rectangle') {
        ctx.beginPath();
        ctx.rect(x, y, size, height);
        ctx.fill();
        ctx.stroke();
    } else if (figureSelect === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y - height);
        ctx.closePath();
        ctx.fill();
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
    window.location.href = "about:blank"; // Redirige a una página en blanco
}

// Event listener para actualizar los campos al cambiar el sistema de coordenadas
document.getElementById('coordSystem').addEventListener('change', updateCoordFields);
document.getElementById('figureSelect').addEventListener('change', function() {
    const figureSelect = this.value;
    const heightField = document.getElementById('heightField');
    if (figureSelect === 'rectangle' || figureSelect === 'triangle') {
        heightField.style.display = 'block';
    } else {
        heightField.style.display = 'none';
    }
});

// Inicializar el formulario con los campos correctos
updateCoordFields();
