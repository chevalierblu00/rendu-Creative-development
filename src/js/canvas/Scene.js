import GlobalContext from "../GlobalContext"
import DomElement from "../utils/DomElement"

export default class Scene {
    constructor(id = "canvas-scene") {
        this.id = id
        this.globalContext = new GlobalContext()
        this.globalContext.pushScene(this)

        // debug
        this.params = {
            'opacity': 1.0, // Opacité initiale
            'borderSize': 1 // Taille de la bordure initiale
        }
        this.debug = this.globalContext.debug
        if (this.debug.active && !this.debug.ui.__folders[this.id]) {
            this.debugFolder = this.debug.ui.addFolder(this.id);
            this.debugFolder.add(this.params, 'opacity', 0.0, 1.0); // Contrôle d'opacité
            this.debugFolder.add(this.params, 'borderSize', 0, 10); // Contrôle de la taille de la bordure
        }

        // canvas
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.instance
        this.context = this.canvas.getContext('2d')
        this.resize()

        // Ajout de l'écouteur d'événement de redimensionnement avec l'option passive
        window.addEventListener('resize', () => this.resize(), { passive: true });
    }

    get width() { return this.domElement.width }
    get height() { return this.domElement.height }
    get position() { return this.domElement.position }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    update() {
        return this.params['is-update']
    }

    resize() {
        this.domElement.setSize()
        this.canvas.width = this.domElement.width * this.globalContext.windowSize.pixelRatio // set dimensions
        this.canvas.height = this.domElement.height * this.globalContext.windowSize.pixelRatio
        this.context.scale(this.globalContext.windowSize.pixelRatio, this.globalContext.windowSize.pixelRatio)
    }

    destroy() { }
}
