export default class GameElement{
    constructor(x, y, srcImg, width, height, deltaX = 0, deltaY = 0){
        this.x = x;
        this.y = y;
        this.image = this.#createImage(srcImg);
        this.width = width;
        this.height = height;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
    draw(context) {
        context.drawImage(this.image,this.x,this.y,this.width, this.height);
      }
      estCollisionAvec(objet){
        if (!objet)
            return false;
        return (this.x + this.width  > objet.x && this.x < objet.x + objet.width )
            && (this.y + this.height > objet.y && this.y < objet.y + objet.height);
      }

    #createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }
}
