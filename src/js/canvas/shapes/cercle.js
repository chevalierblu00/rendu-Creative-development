export class StaticCircle {
    constructor(x, y, radius, opacity, canvasWidth, canvasHeight, borderSize) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.initialRadius = radius;
        this.opacity = opacity;
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.borderSize = borderSize; // Ajout du paramètre de taille de bordure
    }

    draw(context, opacity, borderSize) {
        const now = new Date();
        const seconds = now.getSeconds();
    
        // Définir la couleur en fonction des secondes
        context.fillStyle = `hsla(${seconds * 6}, 100%, 50%, ${opacity})`; // Utilisez hsla pour inclure l'opacité
    
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.lineWidth = borderSize;
        context.strokeStyle = '#000'; 
        context.stroke(); 
        context.fill();
        context.closePath();
    }


    update() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // Calculer la croissance du rayon en fonction de l'heure
        const scaleFactor = 3; // Facteur de mise à l'échelle pour ajuster la vitesse de croissance
        const timeFactor = (hours * 60 + minutes) / (24 * 60); // Facteur de temps (entre 0 et 1)
        const growthFactor = Math.pow(Math.E, scaleFactor * timeFactor); // Fonction exponentielle

        // Calculer le rayon maximal en fonction des dimensions du canvas
        const canvasMaxRadius = Math.min(this.canvasWidth, this.canvasHeight) / 2;

        // Mettre à jour le rayon avec le facteur de croissance
        this.radius = this.initialRadius * growthFactor;

        // Vérifier si le cercle dépasse les limites du canvas
        const leftEdge = this.x - this.radius;
        const rightEdge = this.x + this.radius;
        const topEdge = this.y - this.radius;
        const bottomEdge = this.y + this.radius;

        if (leftEdge < 0 || rightEdge > this.canvasWidth || topEdge < 0 || bottomEdge > this.canvasHeight) {
            // Si le cercle dépasse les limites du canvas, ajuster le rayon pour qu'il atteigne les bords
            this.radius = Math.min(this.radius, Math.min(this.x, this.canvasWidth - this.x, this.y, this.canvasHeight - this.y));
        }
    }
}
