import KeyManager from "./keyManager";
import Arc from "./arc";
import Cible from "./cible";
import Fleche from "./fleche";
import Carquois from "./carquois";
import Oiseau from "./oiseau";
export default class Game {
  #canvas;
  static F_WIDTH = 12;
  static F_HEIGHT = 72;
  #estPause = true;

  constructor(canvas) {
    this.#canvas = canvas;
    this.context = canvas.getContext("2d");
    this.keyManager = new KeyManager();
    this.raf = null;
    this.arc = new Arc(225, 500, 96, 71);
    this.cible = new Cible(this.canvas.width);
    this.carquois = new Carquois(this.canvas.width);
    this.fleche = [];
    this.score = 0;
    this.oiseau = [];
    this.nbFleches = 5;
    this.nbVie = 3;
  }

  /** donne accès au canvas correspondant à la zone de jeu */
  get canvas() {
    return this.#canvas;
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Arc
    this.arc.handleMoveKeys(this.keyManager);
    this.arc.move(this.canvas);
    this.arc.draw(this.context);
    // Cible
    if (this.cible !== null) this.cible.draw(this.context);
    else this.cible = new Cible(this.canvas.width);

    //Carquois
    if (this.carquois !== null) this.carquois.draw(this.context);
    else this.carquois = new Carquois(this.canvas.width);

    this.oiseau.forEach((bird, birdIndex) => {
      bird.move(this.#canvas);
      bird.draw(this.context);
      if (bird.estCollisionAvec(this.arc)) {
        this.nbVie--;
        this.oiseau.splice(birdIndex, 1);
        document.getElementById(
          "life-" + (this.nbVie + 1).toString()
        ).style.display = "none";
        return;
      }
      if (bird.estCollisionAvec(this.carquois)) {
        this.carquois = null;
      }
      if (bird.x > 600 || bird.x < -100) {
        this.oiseau.splice(birdIndex, 1);
      }
    });

    // collision Fleche + cible
    this.fleche = this.fleche.filter((arrow) => {
      if (arrow.estCollisionAvec(this.cible)) {
        this.cible = null;
        this.score += 1000;
        document.getElementById("score").textContent = this.score;
        return false;
      }
      return true;
    });
    //fleche + oiseau
    this.fleche.forEach((arrow, arrowIndex) => {
      arrow.move(this.#canvas);
      arrow.draw(this.context);

      this.oiseau.forEach((bird, birdIndex) => {
        if (arrow.estCollisionAvec(bird)) {
          this.fleche.splice(arrowIndex, 1);
          this.oiseau.splice(birdIndex, 1);
        }
      });
      if (arrow.y < -80) {
        this.fleche.splice(arrowIndex, 1);
      }
    });

    //arc carquois
    if (this.arc.estCollisionAvec(this.carquois)) {
      this.carquois = null;
      this.nbFleches = 5;
      document.getElementById("nbArrows").textContent = this.nbFleches;
    }

    if (this.nbVie < 1) {
      window.cancelAnimationFrame(this.raf);
      const message = "Game over! Vous n'avez plus de vie.";
      alert(message);
      return;
    }

    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }

  tirerFleches() {
    if (!this.#estPause && this.nbFleches > 0) {
      this.fleche.push(
        new Fleche(
          this.arc.x + this.arc.width / 2 - Game.F_WIDTH / 2,
          this.arc.y,
          Game.F_WIDTH,
          Game.F_HEIGHT
        )
      );
      this.nbFleches--;
      document.getElementById("nbArrows").textContent = this.nbFleches;
    }
  }
  ajoutOiseau() {
    const direction = Math.random() > 0.5 ? 1 : -1;

    this.oiseau.push(new Oiseau(this.canvas.width, direction));
  }

  startAndStop() {
    if (this.raf === null) {
      this.#estPause = false;
      document.getElementById("nbArrows").textContent = this.nbFleches;
      document.getElementById("stopAndStartGame").textContent = "Stop";
      this.interCarquois = setInterval(
        () =>
          Math.round(Math.random()) === 1
            ? (this.carquois = new Carquois(this.canvas.width))
            : null,
        1500
      );
      this.interOiseau = setInterval(
        () => (Math.random() > 0.25 ? this.ajoutOiseau() : null),
        1000
      );
      this.raf = window.requestAnimationFrame(this.animate.bind(this));
    } else {
      this.#estPause = true;
      document.getElementById("stopAndStartGame").textContent = "Start";
      window.cancelAnimationFrame(this.raf);
      this.raf = null;
      clearInterval(this.interCarquois);
      clearInterval(this.interOiseau);
    }
  }
  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.keyManager.leftPressed();
        break;
      case "ArrowRight":
      case "Right":
        this.keyManager.rightPressed();
        break;
      case "ArrowUp":
      case "Up":
        this.keyManager.upPressed();
        break;
      case "ArrowDown":
      case "Down":
        this.keyManager.downPressed();
        break;
      case "Space":
      case " ":
        if (!event.repeat)
          this.fleche.push(
            new Fleche(
              this.arc.x + this.arc.width / 2 - Fleche.F_WIDTH / 2,
              this.arc.y
            )
          );

        break;
      default:
        return;
    }
    event.preventDefault();
  }

  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "Left":
        this.keyManager.leftReleased();
        break;
      case "ArrowRight":
      case "Right":
        this.keyManager.rightReleased();
        break;
      case "ArrowUp":
      case "Up":
        this.keyManager.upReleased();
        break;
      case "ArrowDown":
      case "Down":
        this.keyManager.downReleased();
        break;
      case " ":
        this.tirerFleches();

      default:
        return;
    }
    event.preventDefault();
  }
}
