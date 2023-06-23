const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // No preloading required for graphics-based bottle
}

function create() {
  const graphics = this.add.graphics();

  // Set the bottle's position and dimensions
  const bottleX = config.width / 2;
  const bottleY = config.height / 2;
  const bottleWidth = 200;
  const bottleHeight = 400;

  // Set the fill color and line style for the bottle
  graphics.fillStyle(0xff0000); // Red color
  graphics.lineStyle(4, 0x000000); // Black color, 4-pixel thickness

  // Draw the bottle shape
  graphics.beginPath();
  graphics.moveTo(bottleX - bottleWidth / 2, bottleY + bottleHeight / 2);
  graphics.lineTo(bottleX - bottleWidth / 2, bottleY - bottleHeight / 2);
  graphics.lineTo(bottleX + bottleWidth / 2, bottleY - bottleHeight / 2);
  graphics.lineTo(bottleX + bottleWidth / 2, bottleY + bottleHeight / 2);
  graphics.lineTo(bottleX, bottleY + bottleHeight / 2);
  graphics.lineTo(bottleX - bottleWidth / 2, bottleY + bottleHeight / 2);
  graphics.closePath();

  // Fill the bottle shape with the specified fill color
  graphics.fill();

  // Draw the bottle shape's outline
  graphics.stroke();

  // Create a function to create a random bubble
  function createBubble() {
    const x = Phaser.Math.Between(bottleX - bottleWidth / 2, bottleX + bottleWidth / 2);
    const y = bottleY + bottleHeight / 2;
    const radius = Phaser.Math.Between(10, 30);
    const color = Phaser.Math.RND.integerInRange(0x000000, 0xffffff);

    graphics.fillStyle(color);
    graphics.fillCircle(x, y, radius);

    // Create a tween to animate the bubble
    const bubbleTween = this.tweens.add({
      targets: graphics,
      y: y - bottleHeight / 2 - radius,
      duration: 20000,
      onComplete: function () {
        graphics.clear(); // Clear the graphics object after the bubble is off-screen
      }
    });
  }

  // Set up a timer to create bubbles at regular intervals
  this.time.addEvent({
    delay: 500, // Adjust the delay between bubbles as needed
    callback: createBubble,
    callbackScope: this,
    loop: true
  });
}

function update() {
  // Game update logic goes here
}
