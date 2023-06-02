var square=function (){ // a constructor function for a square object
    this.date=[ // an array to store the shape data of the square
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    this.origin={ // an object to store the origin position of the square
        x:0,
        y:0
    }
    this.fangxiang=0; // a variable to store the direction of the square (0-3)
}
square.prototype.canRotate=function (jiancehefa){ // a method to check if the square can rotate
    var t=this.fangxiang+1; // get the next direction after rotation
    if(t==4){ // if it exceeds 3
        t=0; // reset it to 0
    }
    var test=[ // an array to store the shape data of the rotated square
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for(i=0;i<this.date.length;i++){ // loop through the rows of the shape data
        for(j=0;j<this.date[0].length;j++){ // loop through the columns of the shape data
            test[i][j]=this.rotates[t][i][j]; // copy the rotated data from this.rotates array
        }
    }
    return jiancehefa(this.origin,test); // return the result of calling jiancehefa function with the origin and test data as arguments
}
square.prototype.canDown=function (jiancehefa){ // a method to check if the square can move down
    var test={}; // an object to store the test position of the square
    test.x=this.origin.x+1; // increase x by 1 (move down)
    test.y=this.origin.y; // keep y unchanged 
    return jiancehefa(test,this.date); // return the result of calling jiancehefa function with the test position and shape data as arguments
}
square.prototype.canLeft=function (jiancehefa){ // a method to check if the square can move left
    var test={}; // an object to store the test position of the square
    test.x=this.origin.x; // keep x unchanged 
    test.y=this.origin.y-1; // decrease y by 1 (move left)
    return jiancehefa(test,this.date); // return the result of calling jiancehefa function with the test position and shape data as arguments
}
square.prototype.canRight=function (jiancehefa){ // a method to check if the square can move right
    var test={}; // an object to store the test position of the square
    test.x=this.origin.x; // keep x unchanged 
    test.y=this.origin.y+1; // increase y by 1 (move right)
    return jiancehefa(test,this.date); // return the result of calling jiancehefa function with the test position and shape data as arguments
}
square.prototype.down=function (){ // a method to move the square down by one unit
    this.origin.x+=1; // increase x by 1 
}
square.prototype.left=function (){ // a method to move the square left by one unit
    this.origin.y-=1; // decrease y by 1 
}
square.prototype.right=function (){ // a method to move the square right by one unit
    this.origin.y+=1; // increase y by 1 
}
square.prototype.rotate=function (num){ // a method to rotate the square by a given number of times (default is 1)
    if(!num) num=1; // if num is not given or falsy, set it to 1 
    this.fangxiang=(this.fangxiang+num)%4; // update fangxiang by adding num and modulo 4 
    if(this.fangxiang==4){ // if fangxiang is 4 
        this.fangxiang=0; // reset it to 0 
    }
    for(i=0;i<this.date.length;i++){ // loop through the rows of the shape data 
        for(j=0;j<this.date[0].length;j++){ // loop through the columns of the shape data 
            this.date[i][j]=this.rotates[this.fangxiang][i][j]; // copy the rotated data from this.rotates array
        }
    }
}