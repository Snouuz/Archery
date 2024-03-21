import GameElement from "./gameElement";
import arcSrcImg from "./assets/images/arc.png";

export default class Arc extends GameElement {
    static NB_FLECHE = 5;

    constructor(x, y, width, height) {
      super(x, y, arcSrcImg, width, height);

    }

  
    moveLeft() {
        this.deltaX = this.deltaX - 10;   // le déplacement se fera vers la gauche, par pas de 10px
    }
    moveRight() {
        this.deltaX = this.deltaX + 10;   // le déplacement se fera vers la droite, par pas de 10px
    }
    moveUp(){
        this.deltaY = this.deltaY - 10;
    }
    moveDown(){
        this.deltaY = this.deltaY + 10;
    }
    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }
    move(box) {              
        this.x = Math.max(0, Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(100,Math.min(box.height - this.height,this.y + this.deltaY));
    }
    handleMoveKeys(keyManager) {
        this.stopMoving();   
        if (keyManager.left)  
            this.moveLeft();
        if (keyManager.right) 
            this.moveRight();
        if (keyManager.up)
            this.moveUp();
        if (keyManager.down)
            this.moveDown();
    }
        
}