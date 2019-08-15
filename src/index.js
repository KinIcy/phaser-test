import Phaser from "phaser";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  }
};

const game = new Phaser.Game(config);

function preload() {
  // this.load.image("logo", logoImg);
}

let circle
let rect
let level = 1
let score = 0

let coin
let coinHitBox
let scoreText

let gameOver = false;

function create() {
  
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

  circle = this.add.circle(400, 300, 100, 0x800000)

  coin = this.add.circle(400, 300, 20, 0xFFFF00).setOrigin(1.5, 1.5)
  coinHitBox = new Phaser.Geom.Circle(20, 20, 20)

  coin.setInteractive(coinHitBox, Phaser.Geom.Circle.Contains)

  coin.on('pointerover', () => coin.fillColor = 0xFF8000)
  coin.on('pointerout', () => coin.fillColor = 0xFFFF00)
  coin.on('pointerdown', () => {
    if (gameOver) return;
    coin.rotation = Phaser.Math.Between(-Math.PI, Math.PI)
    score += 10
    scoreText.setText('Score: ' + score);
    level += 1;
  })

  rect = this.add.rectangle(400, 300, 120, 30, 0x000080).setOrigin(0, 0.5).setInteractive()

  rect.on('pointerover', () => gameOver = true)


  // const logo = this.add.image(400, 150, "logo");

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: "Power2",
  //   yoyo: true,
  //   loop: -1
  // });
}

function update() {
  if (!gameOver) rect.rotation += 0.005 * level;
}