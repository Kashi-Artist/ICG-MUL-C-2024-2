class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

class Figura {
    constructor(puntos) {
        this.puntos = puntos;
    }

    dibujarFigura(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpiar el canvas antes de dibujar
        ctx.beginPath();

        const primerPunto = this.puntos[0];
        ctx.moveTo(primerPunto.getX(), primerPunto.getY());

        for (let i = 1; i < this.puntos.length; i++) {
            const punto = this.puntos[i];
            ctx.lineTo(punto.getX(), punto.getY());
        }

        ctx.lineTo(primerPunto.getX(), primerPunto.getY()); // Cerrar el polígono
        ctx.stroke();
    }

    esConvexa() {
        let esConvexa = true;
        const numPuntos = this.puntos.length;
        let signoInicial = 0;

        for (let i = 0; i < numPuntos; i++) {
            const p0 = this.puntos[i];
            const p1 = this.puntos[(i + 1) % numPuntos];
            const p2 = this.puntos[(i + 2) % numPuntos];

            const crossProduct = (p1.getX() - p0.getX()) * (p2.getY() - p1.getY()) - (p1.getY() - p0.getY()) * (p2.getX() - p1.getX());

            if (i === 0) {
                signoInicial = Math.sign(crossProduct);
            } else {
                if (Math.sign(crossProduct) !== signoInicial) {
                    esConvexa = false;
                    break;
                }
            }
        }

        return esConvexa;
    }

    verificarCruce() {
        const numPuntos = this.puntos.length;

        for (let i = 0; i < numPuntos - 1; i++) {
            for (let j = i + 2; j < numPuntos; j++) {
                if (this.seIntersectan(this.puntos[i], this.puntos[i + 1], this.puntos[j], this.puntos[(j + 1) % numPuntos])) {
                    return true;
                }
            }
        }

        return false;
    }

    seIntersectan(p1, q1, p2, q2) {
        const orientacion = (p, q, r) => {
            const val = (q.getY() - p.getY()) * (r.getX() - q.getX()) - (q.getX() - p.getX()) * (r.getY() - q.getY());
            if (val === 0) return 0; // Colineales
            return (val > 0) ? 1 : 2; // 1 = sentido horario, 2 = antihorario
        };

        const o1 = orientacion(p1, q1, p2);
        const o2 = orientacion(p1, q1, q2);
        const o3 = orientacion(p2, q2, p1);
        const o4 = orientacion(p2, q2, q1);

        // Caso general
        if (o1 !== o2 && o3 !== o4) {
            return true;
        }

        return false;
    }
}

class Generador {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }

    generarPuntosAleatorios(cantidad) {
        const puntos = [];
        for (let i = 0; i < cantidad; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }

    generarFigura() {
        let puntos, figura;
        do {
            puntos = this.generarPuntosAleatorios(5);  // Genera 5 puntos
            figura = new Figura(puntos);
        } while (figura.verificarCruce());  // Regenerar si hay líneas que se cruzan

        figura.dibujarFigura(this.ctx);

        const resultado = figura.esConvexa() ? "La figura es convexa" : "La figura es cóncava";
        document.getElementById("result").textContent = resultado;
    }

    reset() {
        this.generarFigura();
    }
}

function main() {
    const generador = new Generador("canvas");
    generador.generarFigura();

    document.getElementById("resetButton").addEventListener("click", () => {
        generador.reset();
    });
}

window.onload = main;
