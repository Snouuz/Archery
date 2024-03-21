import GameElement from "./gameElement";
import flecheSrcImg from "./assets/images/fleche.png";
import Game from "./game";

export default class Fleche extends GameElement {

    constructor(x, y, width, height,) {
        super(x, y, flecheSrcImg, width, height,0 , 8);
    }

    move(box){
        this.y -= this.deltaY;
    }

}
