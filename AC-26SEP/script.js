// Clase Punto
class Punto {
    #x; // Atributo privado
    #y; // Atributo privado
  
    constructor(x, y) {
      this.#x = x;
      this.#y = y;
    }
  
    get x() {
      return this.#x;
    }
  
    get y() {
      return this.#y;
    }
  
    set x(value) {
      this.#x = value;
    }
  
    set y(value) {
      this.#y = value;
    }
}
  
// Clase Línea usando algoritmo de Bresenham
class Linea {
    #punto1; // Atributo privado
    #punto2; // Atributo privado
  
    constructor(punto1, punto2) {
      this.#punto1 = punto1;
      this.#punto2 = punto2;
    }
  
    // Método para dibujar la línea usando el algoritmo de Bresenham
    dibujar(svgCanvas) {
      let x1 = this.#punto1.x;
      let y1 = this.#punto1.y;
      let x2 = this.#punto2.x;
      let y2 = this.#punto2.y;
  
      const dx = Math.abs(x2 - x1);
      const dy = Math.abs(y2 - y1);
      const sx = (x1 < x2) ? 1 : -1;
      const sy = (y1 < y2) ? 1 : -1;
      let err = dx - dy;
  
      while (true) {
        this.#dibujarPunto(svgCanvas, x1, y1); // Dibuja un "píxel" en SVG
        if (x1 === x2 && y1 === y2) break;
        const err2 = err * 2;
        if (err2 > -dy) {
          err -= dy;
          x1 += sx;
        }
        if (err2 < dx) {
          err += dx;
          y1 += sy;
        }
      }
    }
  
    // Método privado para dibujar un punto en SVG (círculo pequeño)
    #dibujarPunto(svgCanvas, x, y) {
      const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      puntoSVG.setAttribute("cx", x);
      puntoSVG.setAttribute("cy", y);
      puntoSVG.setAttribute("r", 1);  // Radio pequeño para simular píxel
      puntoSVG.setAttribute("fill", "black");
      svgCanvas.appendChild(puntoSVG);
    }
}
  
// Clase Circunferencia usando algoritmo de Bresenham
class Circunferencia {
    #centro; // Punto como atributo privado
    #radio; // Atributo privado
  
    constructor(centro, radio) {
      this.#centro = centro;  // centro es un objeto de la clase Punto
      this.#radio = radio;
    }
  
    dibujar(svgCanvas) {
      let x = this.#radio;
      let y = 0;
      let err = 0;
  
      while (x >= y) {
        this.#dibujarPuntosSimetricos(svgCanvas, x, y);
        y++;
        if (err <= 0) {
          err += 2 * y + 1;
        }
        if (err > 0) {
          x--;
          err -= 2 * x + 1;
        }
      }
    }
  
    // Método privado para dibujar puntos simétricos en las 8 octantes
    #dibujarPuntosSimetricos(svgCanvas, x, y) {
      const cx = this.#centro.x;
      const cy = this.#centro.y;
      this.#dibujarPunto(svgCanvas, cx + x, cy + y);
      this.#dibujarPunto(svgCanvas, cx + y, cy + x);
      this.#dibujarPunto(svgCanvas, cx - y, cy + x);
      this.#dibujarPunto(svgCanvas, cx - x, cy + y);
      this.#dibujarPunto(svgCanvas, cx - x, cy - y);
      this.#dibujarPunto(svgCanvas, cx - y, cy - x);
      this.#dibujarPunto(svgCanvas, cx + y, cy - x);
      this.#dibujarPunto(svgCanvas, cx + x, cy - y);
    }
  
    // Método privado para dibujar un punto en SVG (círculo pequeño)
    #dibujarPunto(svgCanvas, x, y) {
      const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      puntoSVG.setAttribute("cx", x);
      puntoSVG.setAttribute("cy", y);
      puntoSVG.setAttribute("r", 1);  // Radio pequeño para simular píxel
      puntoSVG.setAttribute("fill", "black");
      svgCanvas.appendChild(puntoSVG);
    }
}
  
// Clase Elipse usando algoritmo de Bresenham
class Elipse {
    #centro; // Punto como atributo privado
    #a;  // Atributo privado (radio mayor)
    #b;  // Atributo privado (radio menor)
  
    constructor(centro, a, b) {
      this.#centro = centro;  // centro es un objeto de la clase Punto
      this.#a = a;
      this.#b = b;
    }
  
    dibujar(svgCanvas) {
    let x = 0;
    let y = this.#b;
    let a2 = this.#a * this.#a; // Cuadrado del radio mayor
    let b2 = this.#b * this.#b; // Cuadrado del radio menor

    let dx = 2 * b2 * x; // Cambio en x para el error
    let dy = 2 * a2 * y; // Cambio en y para el error

    // Región 1 (donde la pendiente es < -1)
    let err = b2 - (a2 * this.#b) + (0.25 * a2);

    while (dx < dy) {
      this.#dibujarPuntosSimetricos(svgCanvas, x, y);
      x++;
      dx += 2 * b2;
      err += dx + b2;
      if (err >= 0) {
        y--;
        dy -= 2 * a2;
        err -= dy;
      }
    }

    // Región 2 (donde la pendiente es >= -1)
    err = b2 * (x + 0.5) * (x + 0.5) + a2 * (y - 1) * (y - 1) - a2 * b2;

    while (y >= 0) {
      this.#dibujarPuntosSimetricos(svgCanvas, x, y);
      y--;
      dy -= 2 * a2;
      err += a2 - dy;
      if (err <= 0) {
        x++;
        dx += 2 * b2;
        err += dx;
      }
    }
  }

  // Método privado para dibujar puntos simétricos en los cuatro cuadrantes
  #dibujarPuntosSimetricos(svgCanvas, x, y) {
    const cx = this.#centro.x;
    const cy = this.#centro.y;
    this.#dibujarPunto(svgCanvas, cx + x, cy + y); // Cuadrante 1
    this.#dibujarPunto(svgCanvas, cx - x, cy + y); // Cuadrante 2
    this.#dibujarPunto(svgCanvas, cx + x, cy - y); // Cuadrante 3
    this.#dibujarPunto(svgCanvas, cx - x, cy - y); // Cuadrante 4
  }

  // Método privado para dibujar un punto en SVG (círculo pequeño)
  #dibujarPunto(svgCanvas, x, y) {
    const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    puntoSVG.setAttribute("cx", x);
    puntoSVG.setAttribute("cy", y);
    puntoSVG.setAttribute("r", 1);  // Radio pequeño para simular píxel
    puntoSVG.setAttribute("fill", "black");
    svgCanvas.appendChild(puntoSVG);
  }
}
  
// Obtener el canvas SVG
const svgCanvas = document.getElementById('svgCanvas');

// Crear puntos e instanciar objetos
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const linea = new Linea(punto1, punto2);

const centroCircunferencia = new Punto(300, 100);
const circunferencia = new Circunferencia(centroCircunferencia, 50);

const centroElipse = new Punto(400, 300);
const elipse = new Elipse(centroElipse, 80, 50);

// Dibujar las figuras en SVG
linea.dibujar(svgCanvas);
circunferencia.dibujar(svgCanvas);
elipse.dibujar(svgCanvas);
