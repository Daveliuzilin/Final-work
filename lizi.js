//Create a canvas element
var canvas = document.createElement("canvas");
//Get the canvas context
var ctx = canvas.getContext("2d");
//Set the canvas width and height to the browser window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Add the canvas to the document
document.body.appendChild(canvas);

//Define an array to store the particle objects
var particles = [];

//Define a function to generate random colors
function randomColor() {
  //Randomly generate an integer between 0 and 255, representing the red component
  var r = Math.floor(Math.random() * 256);
  //Randomly generate an integer between 0 and 255, representing the green component
  var g = Math.floor(Math.random() * 256);
  //Randomly generate an integer between 0 and 255, representing the blue component
  var b = Math.floor(Math.random() * 256);
  //Return a color string in rgba format
  return "rgba(" + r + "," + g + "," + b + ",1)";
}

//Define a constructor function to create particle objects
function Particle(x, y) {
  //The initial position of the particle is the mouse click position
  this.x = x;
  this.y = y;
  //The radius of the particle is a randomly generated number between 1 and 5
  this.r = Math.random() * 4 + 1;
  //The color of the particle is randomly generated
  this.color = randomColor();
  //The velocity of the particle is randomly generated between -5 and 5, representing the x and y direction velocity components
  this.vx = Math.random() * 10 - 5;
  this.vy = Math.random() * 10 - 5;
}

//Add a method to the particle object to update the particle's position and opacity
Particle.prototype.update = function () {
  
   //Update position according to velocity
   this.x += this.vx;
   this.y += this.vy; 

   //Add gravity effect to particles, making y direction velocity gradually increase
   this.vy += 0.1; 

   //Each time update, opacity decreases by 0.01, indicating gradually disappearing
   this.alpha -= 0.01;
};

//Add a method to the particle object to draw the particle on the canvas
Particle.prototype.draw = function () {
  
   //Save current drawing state
   ctx.save(); 

   //Set drawing opacity to particle opacity
   ctx.globalAlpha = this.alpha; 

   //Start drawing path
   
   //Draw a circle, representing the note head
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.r, Math.PI /2 , Math.PI *3/2);
   ctx.fillStyle = this.color;
   ctx.fill();
   
   //Draw a rectangle, representing the note stem
   ctx.beginPath();
   ctx.rect(this.x - this.r/2 ,this.y -this.r*3,this.r,this.r*4);
   ctx.fillStyle = this.color;
   ctx.fill();
   
   //Draw a curve, representing the note flag
   ctx.beginPath();
   ctx.moveTo(this.x -this.r/2,this.y -this.r*3);
   ctx.quadraticCurveTo(this.x -this.r*2,this.y -this.r*4,this.x -this.r/2,this.y -this.r*6);
   ctx.fillStyle = this.color;
   ctx.fill();
//Restore drawing state
ctx.restore();
};

//Define a function to draw all the particles
function drawParticles() {
  
   //Clear the canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height); 

   //Traverse all the particle objects
   for (var i = particles.length -1; i >=0; i--) {
    //Get the current particle object
    var p = particles[i];
    //If the particle's opacity is less than or equal to 0, indicating that it has disappeared, delete the particle object from the array
    if (p.alpha <=0) {
      particles.splice(i,1);
    } else {
      //Otherwise, update and draw the particle object
      p.update();
      p.draw();
    }
    
   }
  
}

//Add a click event listener to the canvas element, which triggers the following function when clicked
canvas.addEventListener("click", function (e) {
  
  //Get the mouse click position
  var x = e.clientX;
  var y = e.clientY;
  
  //Generate 50 particle objects and add them to the array
  for (var i = 0; i < 50; i++) {
    var p = new Particle(x, y);
    particles.push(p);
  }
  
});

//Set a timer to call the drawParticles function every 16 milliseconds to achieve animation effect
setInterval(drawParticles, 16);
