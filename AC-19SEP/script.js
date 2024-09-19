const svgCanvas = document.getElementById('svgCanvas');

// Clase Línea
class Linea {
    constructor(x1, y1, x2, y2) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    get x1() { return this._x1; }
    get y1() { return this._y1; }
    get x2() { return this._x2; }
    get y2() { return this._y2; }

    set x1(value) { this._x1 = value; }
    set y1(value) { this._y1 = value; }
    set x2(value) { this._x2 = value; }
    set y2(value) { this._y2 = value; }

    // Método para dibujar la línea usando SVG
    dibujar() {
        const lineaSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineaSVG.setAttribute("x1", this._x1);
        lineaSVG.setAttribute("y1", this._y1);
        lineaSVG.setAttribute("x2", this._x2);
        lineaSVG.setAttribute("y2", this._y2);
        lineaSVG.setAttribute("stroke", "black");
        svgCanvas.appendChild(lineaSVG);
    }
}

// Clase Circunferencia
class Circunferencia {
    constructor(cx, cy, radio) {
        this._cx = cx;
        this._cy = cy;
        this._radio = radio;
    }

    get cx() { return this._cx; }
    get cy() { return this._cy; }
    get radio() { return this._radio; }

    set cx(value) { this._cx = value; }
    set cy(value) { this._cy = value; }
    set radio(value) { this._radio = value; }

    // Método para dibujar la circunferencia usando SVG
    dibujar() {
        const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferenciaSVG.setAttribute("cx", this._cx);
        circunferenciaSVG.setAttribute("cy", this._cy);
        circunferenciaSVG.setAttribute("r", this._radio);
        circunferenciaSVG.setAttribute("stroke", "black");
        circunferenciaSVG.setAttribute("fill", "none");
        svgCanvas.appendChild(circunferenciaSVG);
    }
}

// Clase Elipse
class Elipse {
    constructor(cx, cy, a, b) {
        this._cx = cx;
        this._cy = cy;
        this._a = a;
        this._b = b;
    }

    get cx() { return this._cx; }
    get cy() { return this._cy; }
    get a() { return this._a; }
    get b() { return this._b; }

    set cx(value) { this._cx = value; }
    set cy(value) { this._cy = value; }
    set a(value) { this._a = value; }
    set b(value) { this._b = value; }

    // Método para dibujar la elipse usando SVG
    dibujar() {
        const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipseSVG.setAttribute("cx", this._cx);
        elipseSVG.setAttribute("cy", this._cy);
        elipseSVG.setAttribute("rx", this._a);
        elipseSVG.setAttribute("ry", this._b);
        elipseSVG.setAttribute("stroke", "black");
        elipseSVG.setAttribute("fill", "none");
        svgCanvas.appendChild(elipseSVG);
    }
}

// Instanciar las primitivas y dibujarlas en el SVG
const linea = new Linea(50, 50, 200, 200);
const circunferencia = new Circunferencia(300, 100, 50);
const elipse = new Elipse(400, 300, 80, 50);

// Dibujar en formato SVG
linea.dibujar();
circunferencia.dibujar();
elipse.dibujar();
