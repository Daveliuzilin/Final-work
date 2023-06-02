var Game=function (){
    var gameDiv;
    var nextDiv;
    var line=0;
    var gameDate=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    var cur;
    var next;
    var nextDivs=[];
    var gameDivs=[];
    var initDiv=function (container,date,divs){ // a function to initialize the HTML elements for the game board and the next shape
        for(i=0;i<date.length;i++){ // loop through the rows of the data array
            var div=[]; // an array to store the HTML elements for each row
            for(var j=0;j<date[0].length;j++){ // loop through the columns of the data array
                var newNode=document.createElement("div"); // create a new div element
                newNode.className="none"; // set its class name to none
                newNode.style.top=(i*20)+"px"; // set its top position according to i
                newNode.style.left=(j*20)+"px"; // set its left position according to j
                container.appendChild(newNode); // append the new div element to the container element
                div.push(newNode); // push the new div element to the div array
            }
            divs.push(div); // push the div array to the divs array
        }
    }
    var refreshDiv=function (date,divs){ // a function to refresh the HTML elements according to the data array
        for(i=0;i<date.length;i++){ // loop through the rows of the data array
            for(j=0;j<date[0].length;j++){ // loop through the columns of the data array
                if(date[i][j]==0){ // if the data value is 0 (empty)
                    divs[i][j].className="none" // set the class name of the corresponding HTML element to none
                }
                else if(date[i][j]==1){ // if the data value is 1 (fixed)
                    divs[i][j].className="done" // set the class name of the corresponding HTML element to done
                }
                else if(date[i][j]==2){ // if the data value is 2 (current)
                    divs[i][j].className="current" // set the class name of the corresponding HTML element to current
                }
            }
        }
    }
    var jiance=function (pos,x,y){ // a function to check if a given position is valid for a shape block
        if(pos.x+x<0){ // if x is out of bounds on the top 
            return false; // return false 
        }
        else if(pos.x+x>=gameDate.length){ // if x is out of bounds on the bottom 
            return false; // return false 
        }
        else if(pos.y+y<0){ // if y is out of bounds on the left 
            return false; // return false 
        }
        else if(pos.y+y>=gameDate[0].length){ // if y is out of bounds on the right 
            return false; // return false 
        }
        else if(gameDate[pos.x+x][pos.y+y]==1){ // if there is already a fixed block at that position 
            return false; // return false 
        }
        else{ // otherwise 
            return true; // return true 
        }
    }
    var jiancehefa=function (pos,date){ // a function to check if a given position and shape data are valid for moving or rotating 
        for(i=0;i<date.length;i++){ // loop through the rows of the shape data 
            for(j=0;j<date[0].length;j++){ // loop through the columns of the shape data 
                if(date[i][j]!=0){ // if there is a block at that position in the shape data 
                    if(!jiance(pos,i,j)){ // check if it is valid using jiance function 
                        return false; // if not, return false 
                    }
                }
            }
        }
        return true; // otherwise, return true 
    }
    var clearDate=function (){ // a function to clear the game board data from any current shape blocks 
        for(i=0;i<cur.date.length;i++){ // loop through the rows of the current shape data 
            for(j=0;j<cur.date[0].length;j++){  // loop through the columns of the current shape data 
                if(jiance(cur.origin,i,j)){  // check if it is valid using jiance function 
                    gameDate[cur.origin.x+i][cur.origin.y+j]=0;  // set that position in game board data to 0 (empty)
                }
            }
        }
    }
    var setDate=function (){ // a function to set the game board data with the current shape blocks 
        for(i=0;i<cur.date.length;i++){ // loop through the rows of the current shape data 
            for(j=0;j<cur.date.length;j++){ // loop through the columns of the current shape data 
                if(jiance(cur.origin,i,j)){ // check if it is valid using jiance function 
                    gameDate[i+cur.origin.x][j+cur.origin.y]=cur.date[i][j]; // set that position in game board data to the current shape data value
                }
            }
        }
    }
    this.down=function (){ // a method to move the current shape down by one unit 
        if(cur.canDown(jiancehefa)){ // check if it can move down using canDown method 
            clearDate(); // clear the game board data from any current shape blocks 
            cur.down(); // move the current shape down by one unit 
            setDate(); // set the game board data with the current shape blocks 
            refreshDiv(gameDate,gameDivs); // refresh the HTML elements according to the game board data 
            return true; // return true 
        }
        else
            return false; // otherwise, return false 
    }
    this.left=function (){ // a method to move the current shape left by one unit 
        if(cur.canLeft(jiancehefa)){ // check if it can move left using canLeft method 
            clearDate(); // clear the game board data from any current shape blocks 
            cur.left(); // move the current shape left by one unit 
            setDate(); // set the game board data with the current shape blocks 
            refreshDiv(gameDate,gameDivs); // refresh the HTML elements according to the game board data 
        }
    }
    this.right=function (){ // a method to move the current shape right by one unit 
        if(cur.canRight(jiancehefa)){ // check if it can move right using canRight method 
            clearDate(); // clear the game board data from any current shape blocks 
            cur.right(); // move the current shape right by one unit 
            setDate(); // set the game board data with the current shape blocks 
            refreshDiv(gameDate,gameDivs); // refresh the HTML elements according to the game board data
        }
    }
    this.rotate=function (){ // a method to rotate the current shape by one unit (clockwise) 
        if(cur.canRotate(jiancehefa)){  // check if it can rotate using canRotate method
            clearDate();  // clear the game board data from any current shape blocks
            cur.rotate();  // rotate the current shape by one unit (clockwise)  
            setDate();  // set the game board data with the current shape blocks
            refreshDiv(gameDate,gameDivs);  // refresh the HTML elements according to the game board data
        }
    }
    this.fal=function (){  // a method to drop the current shape to the bottom as fast as possible
        while(this.down());  // keep moving down until it is not possible
    }
    this.guding=function (){  // a method to fixate the current shape on the game board
        for(i=0;i<cur.date.length;i++){  // loop through the rows of the current shape data
            for(j=0;j<cur.date[0].length;j++){  // loop through the columns of the current shape data
                if(jiance(cur.origin,i,j)){  // check if it is valid using jiance function
                    if(gameDate[cur.origin.x+i][cur.origin.y+j]==2) {  // if there is a current block at that position in game board data
                        gameDate[cur.origin.x + i][cur.origin.y + j] = 1;  // change it to a fixed block (1)
                    }
                }
            }
        }
        refreshDiv(gameDate,gameDivs)  // refresh the HTML elements according to the game board data
    }
    this.xiayige=function (zhonglei,fangxiang){
        cur=next;
        setDate();
        next=fangkuai.prototype.make(zhonglei,fangxiang);
        refreshDiv(gameDate,gameDivs);
        refreshDiv(next.date,nextDivs);
    }
    this.xiaohang=function (){ // a method to clear any full rows and update the score 
        for(var i=gameDate.length-1;i>=0;i--){ // loop through the rows of the game board data from bottom to top 
            var flag=0; // a flag to indicate if the row is full 
            for(var j=0;j<gameDate[0].length;j++){ // loop through the columns of the game board data 
                if(gameDate[i][j]==0){ // if there is an empty block in the row 
                    flag=1; // set the flag to 1 (not full) 
                    break; // break the inner loop 
                }
            }
            if(flag==0) { // if the flag is 0 (full) 
                line += 1; // increase the score by 1 
                for (m = i; m >= 0; m--) { // loop through the rows above the full row 
                    for (n = 0; n < gameDate[0].length; n++) { // loop through the columns of the game board data 
                        gameDate[m][n] = gameDate[m - 1][n]; // copy the data from one row above to the current row 
                        gameDate[0][n] = 0; // set the top row data to 0 (empty) 
                    }
                }
                i++; // increase i by 1 to check the same row again (since it has been replaced by a new row) 
            }
        }
        return line; // return the score 
    }
    this.jieshu=function (){ // a method to check if the game is over (the board is full) 
        var flag=0; // a flag to indicate if the game is over
        for(i=0;i<gameDate[0].length;i++){ // loop through the columns of the top row of the game board data
            if(gameDate[0][i]==1){ // if there is a fixed block in that position
                flag=1; // set the flag to 1 (game over)
            }
        }
        return flag; // return the flag
    }
    this.init=function (doms) { // a method to initialize a new game
        document.getElementById("score").innerHTML=0; // reset and update the score display element
        gameDiv = doms.gameDiv; // get a reference to the HTML element for game board display
        nextDiv = doms.nextDiv; // get a reference to the HTML element for next shape display
        cur = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1)); // create a new random shape and color for current turn using fangkuai.prototype.make function
        next = new fangkuai.prototype.make(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1)); // create a new random shape and color for next turn using fangkuai.prototype.make function
        initDiv(gameDiv, gameDate, gameDivs); // initialize the HTML elements for game board display using initDiv function
        initDiv(nextDiv, next.date, nextDivs); // initialize the HTML elements for next shape display using initDiv function
        setDate(); // set the game board data with the current shape blocks
        refreshDiv(gameDate, gameDivs); // refresh the HTML elements according to the game board data
        refreshDiv(next.date, nextDivs); // refresh the HTML elements according to the next shape data
    };
}