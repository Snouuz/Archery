import GameElement from "./gameElement";
import carquois from "./assets/images/fleches.png";


export default class Carquois extends GameElement {

    constructor(tailleCanva) {
        super( Math.floor(Math.random() * (tailleCanva - 27)), Math.floor(Math.random() * (300))+100, carquois, 27,  72);
    }
}