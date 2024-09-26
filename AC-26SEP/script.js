// Clase Punto
class Punto {
    #x; // Atributo privado
    #y; // Atributo privado
  
    constructor(x, y) {
      this.#x = x;
      this.#y = y;}
  
    get x() {
      return this.#x;}
  
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
  
  // Clase Línea
  class Linea {
    #punto1; // Atributo privado
    #punto2; // Atributo privado
  
    constructor(punto1, punto2) {
      this.#punto1 = punto1;
      this.#punto2 = punto2;
    }
  
    // Método para dibujar la línea usando SVG
    dibujar(svgCanvas) {
      const lineaSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
  
      // Usar las coordenadas de los puntos para definir la posición de la línea
      lineaSVG.setAttribute("x1", this.#punto1.x);
      lineaSVG.setAttribute("y1", this.#punto1.y);
      lineaSVG.setAttribute("x2", this.#punto2.x);
      lineaSVG.setAttribute("y2", this.#punto2.y);
  
      lineaSVG.setAttribute("stroke", "black");
      svgCanvas.appendChild(lineaSVG);
    }
  }
  
  // Clase Circunferencia
  class Circunferencia {
    #centro; // Punto como atributo privado
    #radio; // Atributo privado
  
    constructor(centro, radio) {
      this.#centro = centro;  // centro es un objeto de la clase Punto
      this.#radio = radio;
    }
  
    get centro() {
      return this.#centro;
    }
  
    get radio() {
      return this.#radio;
    }
  
    set centro(value) {
      this.#centro = value;
    }
  
    set radio(value) {
      this.#radio = value;
    }
  
    // Método para dibujar la circunferencia usando SVG
    dibujar(svgCanvas) {
      const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circunferenciaSVG.setAttribute("cx", this.#centro.x);
      circunferenciaSVG.setAttribute("cy", this.#centro.y);
      circunferenciaSVG.setAttribute("r", this.#radio);
      circunferenciaSVG.setAttribute("stroke", "black");
      circunferenciaSVG.setAttribute("fill", "none");
      svgCanvas.appendChild(circunferenciaSVG);
    }
  }
  
  // Clase Elipse
  class Elipse {
    #centro; // Punto como atributo privado
    #a;  // Atributo privado (radio mayor)
    #b;  // Atributo privado (radio menor)
  
    constructor(centro, a, b) {
      this.#centro = centro;  // centro es un objeto de la clase Punto
      this.#a = a;
      this.#b = b;
    }
  
    get centro() {
      return this.#centro;
    }
  
    get a() {
      return this.#a;
    }
  
    get b() {
      return this.#b;
    }
  
    set centro(value) {
      this.#centro = value;
    }
  
    set a(value) {
      this.#a = value;
    }
  
    set b(value) {
      this.#b = value;
    }
  
    // Método para dibujar la elipse usando SVG
    dibujar(svgCanvas) {
      const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      elipseSVG.setAttribute("cx", this.#centro.x);
      elipseSVG.setAttribute("cy", this.#centro.y);
      elipseSVG.setAttribute("rx", this.#a);
      elipseSVG.setAttribute("ry", this.#b);
      elipseSVG.setAttribute("stroke", "black");
      elipseSVG.setAttribute("fill", "none");
      svgCanvas.appendChild(elipseSVG);
    }
  }
  
  // Obtener el canvas SVG
  const svgCanvas = document.getElementById('svgCanvas');
  
  // Crear puntos linea e Instanciar objeto
  const punto1 = new Punto(50, 50);
  const punto2 = new Punto(200, 200);
  const linea = new Linea(punto1, punto2);
  // Crear punto circunferencia e Instanciar objeto
  const centroCircunferencia = new Punto(300, 100);
  const circunferencia = new Circunferencia(centroCircunferencia, 50);
  // Crear punto elipse e Instanciar objeto
  const centroElipse = new Punto(400, 300);
  const elipse = new Elipse(centroElipse, 80, 50);
  
  // Dibujar en formato SVG
  linea.dibujar(svgCanvas);
  circunferencia.dibujar(svgCanvas);
  elipse.dibujar(svgCanvas);