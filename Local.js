var Local=function (){
    var game; // a variable to store the game object
    var timer=null; // a variable to store the timer object
    var time = 0; // a variable to store the elapsed time
    var fenshu=0; // a variable to store the score
    var bindKeyEvent=function (){ // a function to bind the keyboard and mouse events
        document.onmousedown=function (e){ // when the mouse is pressed
            tname=e.target.className; // get the class name of the target element
            if(tname=="top"){ // if the target is the top button
                game.rotate(); // rotate the current shape
            }
            else if(tname=="left"){ // if the target is the left button
                game.left(); // move the current shape to the left
            }
            else if(tname=="right"){ // if the target is the right button
                game.right(); // move the current shape to the right
            }
            else if(tname=="down"){ // if the target is the down button
                game.down(); // move the current shape down faster
            }
            else if(tname=="fal"){ // if the target is the fall button
                game.fal(); // drop the current shape to the bottom
            }
        }
        document.onkeydown=function (e){ // when a key is pressed
            if(e.keyCode==39){ // if the right arrow key is pressed
                game.right(); // move the current shape to the right
            }
            else if(e.keyCode==40){ // if the down arrow key is pressed
                game.down(); // move the current shape down faster
            }
            else if(e.keyCode==37){ // if the left arrow key is pressed
                game.left(); // move the current shape to the left
            }
            else if(e.keyCode==38){ // if the up arrow key is pressed
                game.rotate(); // rotate the current shape
            }
            else if(e.keyCode==32){ // if the space key is pressed
                game.fal(); // drop the current shape to the bottom
            }
        }
    }
    var move=function (){ // a function to update the game state every 0.5 seconds
        time+=0.5; // increase the elapsed time by 0.5 seconds
        if(time%1==0){ // if it is an integer second
            document.getElementById("time").innerHTML=time+"s"; // update the time display element
        }
        if(!game.down()){ // if moving down is not possible for the current shape
            game.guding(); // fixate the current shape on the board
            fenshu=game.xiaohang(); // clear any full rows and update the score
            if(fenshu){ 
                document.getElementById("score").innerHTML=fenshu; // update the score display element
            }
            if(game.jieshu()){ // check if the game is over (the board is full)
                clearInterval(timer); // stop the timer 
                alert("game over"); // show an alert message 
                return; 
            }
            game.xiayige(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1)); // generate a new random shape and color for next turn 
        }
    }
    this.start=function (){ // a function to start a new game 
        clearInterval(timer); // clear any previous timer 
        time=0;  // reset time to zero 
        document.getElementById("time").innerHTML=time+"s";  // update time display element 
        var doms={  // an object to store references to HTML elements for game and next shape display 
            gameDiv:document.getElementById("game"),
            nextDiv:document.getElementById("next")
        }
        game=new Game();  // create a new game object 
        game.init(doms);  // initialize it with HTML elements 
        bindKeyEvent();  // bind keyboard and mouse events 
        timer=setInterval(move,500)  // start a timer that calls move function every 0.5 seconds 
    }

}
