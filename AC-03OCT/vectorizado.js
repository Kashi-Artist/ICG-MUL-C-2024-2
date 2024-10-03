// Clase Punto con encapsulamiento
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

// Clase para generar y manejar puntos
class GeneradorPuntos {
    static generarPuntos(numPuntos) {
        const puntos = [];
        for (let i = 0; i < numPuntos; i++) {
            const x = Math.floor(Math.random() * 700) + 50; // Mantener los puntos dentro del SVG
            const y = Math.floor(Math.random() * 600) + 50;
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }

    static calcularCentroide(puntos) {
        let sumaX = 0, sumaY = 0;
        for (let i = 0; i < puntos.length; i++) {
            sumaX += puntos[i].getX();
            sumaY += puntos[i].getY();
        }
        return new Punto(sumaX / puntos.length, sumaY / puntos.length);
    }
}

// Clase para ordenar puntos
class Ordenador {
    static ordenar(puntos) {
        const centroide = GeneradorPuntos.calcularCentroide(puntos);
        let angulos = [];

        // Calcular los ángulos para cada punto
        for (let i = 0; i < puntos.length; i++) {
            const angulo = Math.atan2(puntos[i].getY() - centroide.getY(), puntos[i].getX() - centroide.getX());
            angulos.push({
                punto: puntos[i],
                angulo: angulo
            });
        }

        // Ordenar los puntos usando el método de selección
        for (let i = 0; i < angulos.length - 1; i++) {
            let indiceMinimo = i;
            for (let j = i + 1; j < angulos.length; j++) {
                if (angulos[j].angulo < angulos[indiceMinimo].angulo) {
                    indiceMinimo = j;
                }
            }
            // Intercambiar posiciones
            let temp = angulos[i];
            angulos[i] = angulos[indiceMinimo];
            angulos[indiceMinimo] = temp;
        }

        // Devolver los puntos ordenados
        return angulos.map(item => item.punto);
    }
}

// Clase para dibujar el polígono utilizando SVG
class DibujadorPoligono {
    static dibujar(puntos) {
        const svg = document.getElementById('polygonSvg');
        svg.innerHTML = ''; // Limpiar el SVG

        // Dibuja los puntos como cuadrados
        for (let i = 0; i < puntos.length; i++) {
            const x = puntos[i].getX();
            const y = puntos[i].getY();
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x - 5);
            rect.setAttribute("y", y - 5);
            rect.setAttribute("width", 10);
            rect.setAttribute("height", 10);
            rect.setAttribute("fill", "black"); // Color del punto (cuadrado negro)
            svg.appendChild(rect);
        }

        // Dibuja el polígono conectando los puntos
        let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;
        for (let i = 1; i < puntos.length; i++) {
            pathData += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
        }
        pathData += ' Z'; // Cierra el polígono

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "blue"); // Color de la línea
        svg.appendChild(path);
    }
}

// Clase para analizar si el polígono es convexo o cóncavo
class AnalizadorPoligono {
    static esConvexo(puntos) {
        function crossProduct(o, a, b) {
            return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
        }

        let crossProducts = [];
        const n = puntos.length;

        for (let i = 0; i < n; i++) {
            const o = puntos[i];
            const a = puntos[(i + 1) % n];
            const b = puntos[(i + 2) % n];
            const cp = crossProduct(o, a, b);
            crossProducts.push(cp);
        }

        const positive = crossProducts.every(cp => cp > 0);
        const negative = crossProducts.every(cp => cp < 0);

        return positive || negative ? "Convexo" : "Cóncavo";
    }
}

// Función principal para generar el polígono y verificar su tipo
function main() {
    const cantidadSeleccionada = parseInt(document.getElementById('cantidadPuntos').value);
    let puntos = GeneradorPuntos.generarPuntos(cantidadSeleccionada);
    puntos = Ordenador.ordenar(puntos);
    DibujadorPoligono.dibujar(puntos);
    const tipoPoligono = AnalizadorPoligono.esConvexo(puntos);
    document.getElementById('result').innerText = `El polígono es ${tipoPoligono}.`;
}

// Evento para el botón de generar
document.getElementById('generateButton').addEventListener('click', () => {
    main();
});

// Evento para el botón de restaurar
document.getElementById('restoreButton').addEventListener('click', () => {
    main();
});

// Generar el polígono al cargar la página
window.onload = main;
