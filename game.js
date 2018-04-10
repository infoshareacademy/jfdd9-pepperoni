var myGame;
var myScore;
var myGangsters;
var myCivilians;

function startGame(){
    myGameLevel.start();
    myGame = new component(30, 30, "red", 10, 120);

}
var myGameLevel = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

function component(width, height,color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameLevel.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
}
