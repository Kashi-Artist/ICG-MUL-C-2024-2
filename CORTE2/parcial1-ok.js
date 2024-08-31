class Cartesiana {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }
}

class Polar {
    constructor(radio, angulo) {
        this._radio = radio;
        this._angulo = angulo * (Math.PI / 180); // Convertir a radianes
    }

    get radio() {
        return this._radio;
    }

    get angulo() {
        return this._angulo;
    }

    set radio(value) {
        this._radio = value;
    }

    set angulo(value) {
        this._angulo = value * (Math.PI / 180); // Convertir a radianes
    }

    aCartesiana() {
        const x = this._radio * Math.cos(this._angulo);
        const y = this._radio * Math.sin(this._angulo);
        return new Cartesiana(x, y);
    }
}

class ConstruccionPoligono {
    constructor() {
        this.canvas = document.getElementById('miCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    obtenerValores() {
        const n = parseInt(document.getElementById('n').value);
        const dimensionType = document.getElementById('dimensionType').value;
        const dimensionValue = parseFloat(document.getElementById('dimensionValue').value);
        const coordenadaTipo = document.getElementById('coordenadaTipo').value;

        let coordenadas;
        if (coordenadaTipo === "cartesiana") {
            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);
            coordenadas = new Cartesiana(x, y);
        } else {
            const radio = parseFloat(document.getElementById('radio').value);
            const angulo = parseFloat(document.getElementById('angulo').value);
            coordenadas = new Polar(radio, angulo).aCartesiana();
        }

        if (!n || !dimensionValue || !coordenadas.x || !coordenadas.y || n < 3 || dimensionValue <= 0) {
            alert('Por favor, ingrese valores válidos.');
            return null;
        }

        const esLado = dimensionType === "lado";

        return {
            dimension: dimensionValue,
            numeroDeLados: n,
            coordenadaX: coordenadas.x,
            coordenadaY: coordenadas.y,
            esLado
        };
    }

    calcularRadio(n, dimension, esLado) {
        if (esLado) {
            return dimension / (2 * Math.sin(Math.PI / n));
        } else {
            return dimension / Math.cos(Math.PI / n);
        }
    }

    calcularVertices(valores) {
        const { dimension, numeroDeLados, esLado, coordenadaX, coordenadaY } = valores;
        const radio = this.calcularRadio(numeroDeLados, dimension, esLado);

        const angulo = 2 * Math.PI / numeroDeLados;

        const vertices = [];
        for (let i = 0; i < numeroDeLados; i++) {
            const theta = i * angulo - Math.PI / 2;
            const x = coordenadaX + radio * Math.cos(theta);
            const y = coordenadaY + radio * Math.sin(theta);
            vertices.push([x, y]);
        }
        return vertices;
    }

    graficarPoligono(vertices) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        vertices.forEach((vertex, index) => {
            if (index === 0) {
                this.ctx.moveTo(vertex[0], vertex[1]);
            } else {
                this.ctx.lineTo(vertex[0], vertex[1]);
            }
        });
        this.ctx.closePath();
        this.ctx.stroke();
    }

    construir() {
        const valores = this.obtenerValores();
        if (valores) {
            const vertices = this.calcularVertices(valores);
            this.graficarPoligono(vertices);
        }
    }
}

function iniciarConstruccion() {
    const construccion = new ConstruccionPoligono();
    construccion.construir();
}

function actualizarCampos() {
    const coordenadaTipo = document.getElementById('coordenadaTipo').value;
    const cartesianaInputs = document.getElementById('cartesianaInputs');
    const polarInputs = document.getElementById('polarInputs');

    if (coordenadaTipo === "cartesiana") {
        cartesianaInputs.style.display = "block";
        polarInputs.style.display = "none";
    } else {
        cartesianaInputs.style.display = "none";
        polarInputs.style.display = "block";
    }
}
