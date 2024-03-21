import GameElement from "./gameElement";
import oiseauDroite from "./assets/images/oiseau-voleur-droite-gauche.png";
import oiseauGauche from "./assets/images/oiseau-voleur-gauche-droite.png";

export default class Oiseau extends GameElement {
    static OISEAU_TAILLE = 93;
    /**
     * @param {int} direction la direction de l'oiseau (1 a gauche , -1 a droite)
     */
    constructor(tailleCanva, direction) {
        let src = direction === 1 ? oiseauGauche : oiseauDroite;
        let x = direction === 1 ? 0-Oiseau.OISEAU_TAILLE : 500;
        super(x,Math.floor(Math.random() * (300))+100, src, Oiseau.OISEAU_TAILLE, Oiseau.OISEAU_TAILLE, direction * 4 );
    }

    move(){
        this.x += this.deltaX;
    }
}