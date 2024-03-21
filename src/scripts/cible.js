import GameElement from "./gameElement";
import cibleSrcImg from "./assets/images/cible.png";


export default class Cible extends GameElement {

    constructor(tailleCanva) {
        super( Math.floor(Math.random() * (tailleCanva - 64)), 0, cibleSrcImg, 64,  64);
    }

}