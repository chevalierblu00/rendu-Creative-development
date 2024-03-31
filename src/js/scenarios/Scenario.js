import Scene from "../canvas/Scene";
import { StaticCircle } from "../canvas/shapes/cercle";

export default class ClockScenario extends Scene {
    constructor(id) {
        super(id);
        this.circle = new StaticCircle(400, 300, 50, this.params.opacity, this.params.borderSize); // Position (400, 300) avec un rayon de 50
        this.init();
        window.addEventListener('resize', () => this.resize());
    }
    

    init() {
        this.setCanvasSize();
        this.context.fillStyle = 'black'; // Couleur du texte
        this.context.font = '48px sans-serif'; // Taille et famille de police
        this.context.textBaseline = 'top'; // Alignement vertical en haut
        this.context.textAlign = 'left'; // Alignement horizontal à gauche
    }

    setCanvasSize() {
        const canvas = document.getElementById(this.id);
        canvas.width = 800; // Largeur fixe
        canvas.height = 600; // Hauteur fixe
        this.context = canvas.getContext('2d');
    }

    drawCircle() {
        this.context.fillStyle = `hsla(${this.params.opacity}, 100%, 50%, ${this.params.opacity})`;
        this.circle.draw(this.context, this.params.opacity, this.params.borderSize);
    }

    resize() {
        console.log('Redimensionnement détecté');
    }

    drawTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Nettoie le canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessine le cercle
        this.drawCircle();

        // Dessine les chiffres en haut à gauche
        this.drawDigits(hours, 10, 10);
        this.drawDigits(minutes, 100, 10);
        this.drawDigits(seconds, 190, 10);
    }

    drawDigits(number, x, y) {
        const text = number.toString().padStart(2, '0');
        this.context.fillText(text, x, y);
    }

    update() {
        this.circle.update(this.params.opacity, this.params.borderSize); // Met à jour le cercle avec les valeurs actuelles d'opacité et de taille de bordure
        this.drawTime();
    }
}

// Initialisation et démarrage de l'animation
const clockScenario = new ClockScenario("canvas-scene");

function animate() {
    clockScenario.update();
    requestAnimationFrame(animate);
}

animate();