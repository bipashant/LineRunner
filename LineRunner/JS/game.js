



function startGame() {
    var newgame = new Game();
    newgame.initializeGame(); 
}
function Game() {
    this.mainwrapper = document.getElementsByClassName('main-wrapper')[0];
    this.movingBackGround = document.getElementsByClassName('buttom')[0];
    this.menuscr = document.getElementById("menuscreen");
    this.score = document.getElementById("scoreid");
    this.movingbackgroundLeftPosition = 0;
    this.maintimer;
    this.mainCounter = 0;
    var newplayer;
    var newopp;
    var that = this;

    this.initializeGame = function () {

        that.menuscr.style.display = "none";
        that.score = 0;
        that.newopp = new OpponentsandCoins();

        that.newplayer = new Player();

        that.newopp.getcurrentplayer(that.newplayer);

        that.movingbackgroundLeftPosition = 0;
        that.Startgame();
    };

    this.Startgame = function () {
        if (that.newplayer.isfalling == false) {
            that.mainCounter++;
            if (that.mainCounter % 60 == 0)
                that.newopp.makeRandomOpponent();

            if (that.mainCounter % 8 == 0 && !that.newplayer.ismoving)
                that.newplayer.changePlayerSprite();
            if (that.mainCounter % 8 == 0 && that.newplayer.playerstatus == 0) {
                that.newplayer.changerollingPlayerSprite();
            }
            that.moveBackGround();
            that.newplayer.jumpManager();
            that.newplayer.stateManager();
            that.newopp.moveAllElementOnPath();
            that.newopp.detectCollision();

            that.maintimer = window.requestAnimationFrame(that.Startgame);

        } else {
            that.newplayer.fallingPlayer();
            if (that.newplayer.fallingPlayerposition >= 505) {
                window.cancelAnimationFrame(that.maintimer);
                that.maintimer = undefined;
                that.menuscr.style.display = "block";
                document.getElementById("scoreid").innerHTML = "Your Score :- "+that.newopp.score;
                 that.newopp.initializeallOponent();
                that.newplayer.initializePlayer();
//                 that.initializeGame();


            } else {

                that.maintimer = window.requestAnimationFrame(that.Startgame);
            }

        }

    };





    this.moveBackGround = function () {
        that.movingbackgroundLeftPosition -= 5;
        that.movingBackGround.style.left = that.movingbackgroundLeftPosition + "px";
    };
}
function Player() {
    this.player = document.getElementById('player');
    this.playernormalheight = 100;
    this.playernormalwidth = 100;
    this.playerrollingheight = 75;
    this.playerrollingwidth = 75;
    this.movingPlayerTopPos = 300;
    this.fallingPlayerposition = 300;
    this.isfalling = false;
    this.playerCurrentHeight = 100;
    this.playernormalTopPosition = 300;
    this.playerrollingTopPosition = 325;
    this.ismoving = false;
    this.spriteXpos = 0;
    this.spriteYpos = 0;
    this.movingdirection;
    this.score;
    this.rollingplayerCounter = 0; //rollingplayerCounter ko value 30 bhayo bhane normal player hunxa
    this.playerstatus = 1; //1 huda normal player 0 huda rolling player
    var that = this;

    this.initializePlayer = function () {
        that.playernormalheight = 100;
        that.playernormalwidth = 100;
        that.playerrollingheight = 75;
        that.playerrollingwidth = 75;
        that.movingPlayerTopPos = 300;
        that.fallingPlayerposition = 300;
        that.isfalling = false;
        that.playerCurrentHeight = 100;
        that.playernormalTopPosition = 300;
        that.playerrollingTopPosition = 325;
        that.ismoving = false;
        that.spriteXpos = 0;
        that.spriteYpos = 0;
        that.movingdirection;
        that.rollingplayerCounter = 0;
        that.playerstatus = 1;


    };

    document.onkeydown = function (e) {
        if (!that.isfalling && !that.ismoving) {
            switch (e.keyCode) {
                case 37:
                    {
                        break;
                    }
                case 38:
                    {
                        that.movingdirection = 1;
                        that.jumpManager();
                        break;
                    }
                case 39:
                    {

                        break;
                    }
                case 40:
                    {
                        that.playerstatus = 0;
                        that.jumpManager();
                        break;
                    }
            }
        }
    };

    this.RollingPlayer = function () {


        that.rollingplayerCounter++;
        that.player.style.height = that.playerrollingheight + "px";
        that.player.style.width = that.playerrollingwidth + "px";
        that.player.style.top = that.playerrollingTopPosition + "px";
        that.movingPlayerTopPos = that.playerrollingTopPosition;
        that.playerCurrentHeight = that.playerrollingheight;
        that.ismoving = true;



    };

    this.normalPlayer = function () {
        if (!that.isfalling) {
            that.player.style.background = "url(mumin/1.png)";
            that.player.style.height = that.playernormalheight + "px";
            that.player.style.width = that.playernormalwidth + "px";
            that.player.style.top = that.playernormalTopPosition + "px";
            that.movingPlayerTopPos = that.playernormalTopPosition;
            that.playerCurrentHeight = that.playernormalheight;
            that.ismoving = false;
        }
    };

    this.jumpManager = function () {
        if (that.movingdirection == 1) {
            that.moveup();
        }
        else {
            that.movedown();
        }

    };

    this.stateManager = function () {
        if (that.playerstatus == 0) {
            that.RollingPlayer();
        }


    };
    var temp = 0;
    this.changePlayerSprite = function () {
        // that.player.style.background = "url(Images/mumin.png)";

        if (temp == 0)
            that.player.style.background = "url(mumin/1.png)";

        if (temp == 1)
            that.player.style.background = "url(mumin/2.png)";
        if (temp == 2)
            that.player.style.background = "url(mumin/3.png)";

        if (temp == 3)
            that.player.style.background = "url(mumin/4.png)";
        if (temp == 4)
            that.player.style.background = "url(mumin/5.png)";
        if (temp == 5) {
            that.player.style.background = "url(mumin/6.png)";
            temp = -1;
        }
        temp++;


    };

    var temp1 = 0;
    this.changerollingPlayerSprite = function () {
        // that.player.style.background = "url(Images/mumin.png)";

        if (temp1 == 0)
            that.player.style.background = "url(rolling/1.png)";

        if (temp1 == 1)
            that.player.style.background = "url(rolling/2.png)";
        if (temp1 == 2)
            that.player.style.background = "url(rolling/3.png)";

        if (temp1 == 3)
            that.player.style.background = "url(rolling/4.png)";
        if (temp1 == 4)
            that.player.style.background = "url(rolling/5.png)";
        if (temp1 == 5) {
            that.player.style.background = "url(rolling/6.png)";
            that.playerstatus = 1;
            that.normalPlayer();
            temp1 = 0;
            that.ismoving = false;
        }
        temp1++;


    };
    this.moveup = function () {
        that.ismoving = true;
        if (that.movingPlayerTopPos < 175) {
            that.movingdirection = 0;

        } else {
            that.movingPlayerTopPos -= 5;
        }
        that.player.style.top = that.movingPlayerTopPos + "px";
    };

    this.movedown = function () {
        if (that.movingPlayerTopPos > that.playernormalTopPosition) {
            that.ismoving = false;
        } else {
            that.movingPlayerTopPos += 5;
        }
        that.player.style.top = that.movingPlayerTopPos + "px";
    };

    this.fallingPlayer = function () {

        that.fallingPlayerposition += 5;
        
        if (that.fallingPlayerposition < 500) {
            that.player.style.background = "url(mumin/deadmumin.png)";
            that.player.style.top = that.fallingPlayerposition + "px";

        } else {
            that.isfalling = false;
            that.normalPlayer();
        }


    };

}

function OpponentsandCoins() {

    this.mainwrapper = document.getElementsByClassName('main-wrapper')[0];
    this.allElementOnPath = [];
    this.allElementOnPathposition = [];
    this.allElementOnPathClassName = [];
    this.UpperopponentTopPosition = 300;
    this.UpperopponentHeight = 20;

    this.LoweropponentTopPosition = 325;
    this.LoweropponentHeight = 75;

    this.coinTopPosition = 220;
    this.coinHeight = 50;

    this.player;
    this.score=0;

    var that = this;
    this.initializeallOponent = function () {
        that.score = 0;
        that.allElementOnPathposition = [];
        that.allElementOnPathClassName = [];
        that.player = null;

        for (var i = 0; i < that.allElementOnPath.length; i++) {

            that.mainwrapper.removeChild(that.allElementOnPath[i]);
        }
        that.allElementOnPath = [];
    };
    this.getcurrentplayer = function (currentplayer) {
        that.player = currentplayer;
    };

    this.makeRandomOpponent = function () {
        var opponentDecider = that.getRandomArbitrary(0, 2);
        if (opponentDecider < 1) {
            that.makeLowerOpponent();
        }


        if (opponentDecider > 1 && opponentDecider < 2) {
            that.makeUpperOpponent();
        }
        if (opponentDecider > 0.5 && opponentDecider < 1.25) {
            that.makeCoins();

        }

    };
    this.makeUpperOpponent = function () {
        var element = document.createElement('div');
        element.className = 'Upperopponent';
        that.mainwrapper.appendChild(element);
        that.allElementOnPath.push(element);
        that.allElementOnPathClassName.push(element.className);
        that.allElementOnPathposition.push(1400);
    };

    this.makeLowerOpponent = function () {
        var element = document.createElement('div');
        element.className = 'Loweropponent';
        that.mainwrapper.appendChild(element);
        that.allElementOnPath.push(element);
        that.allElementOnPathClassName.push(element.className);
        that.allElementOnPathposition.push(1400);
    };

    this.makeCoins = function () {
        var element = document.createElement('div');
        element.className = 'Coin';
        that.mainwrapper.appendChild(element);
        that.allElementOnPath.push(element);
        that.allElementOnPathClassName.push(element.className);
        that.allElementOnPathposition.push(1400);
    };

    this.moveAllElementOnPath = function () {
        that.score += 10;
        for (var i = 0; i < that.allElementOnPath.length; i++) {
            if (that.allElementOnPathposition[i] < 0) {
                that.allElementOnPathposition.splice(i, 1);
                that.mainwrapper.removeChild(that.allElementOnPath[i]);
                that.allElementOnPathClassName.splice(i, 1);
                that.allElementOnPath.splice(i, 1);
            } else {
                that.allElementOnPathposition[i] -= 10;
                that.allElementOnPath[i].style.left = that.allElementOnPathposition[i] + "px";
            }
        }
    };

    this.detectCollision = function () {

        for (var i = 0; i < that.allElementOnPath.length; i++) {

            switch (that.allElementOnPathClassName[i]) {
                case "Loweropponent":
                    if ((that.allElementOnPathposition[i] <= 175 && that.allElementOnPathposition[i] >= 75) && that.player.movingPlayerTopPos + that.player.playerCurrentHeight >= that.LoweropponentTopPosition) {


                       that.player.isfalling = true;

                    }
                    break;
                case "Upperopponent":
                    if ((that.allElementOnPathposition[i] <= 120 && that.allElementOnPathposition[i] >= 1) && that.player.movingPlayerTopPos < that.UpperopponentTopPosition + that.UpperopponentHeight) {
                       that.player.isfalling = true;

                    }
                    break;
                case "Coin":
                    if ((that.allElementOnPathposition[i] <= 200 && that.allElementOnPathposition[i] >= 50) && that.player.movingPlayerTopPos < that.coinTopPosition + that.coinHeight) {
                        // that.player.isfalling = true;
                        that.score += 1000;
                    
                        that.allElementOnPathposition.splice(i, 1);
                       
                        that.mainwrapper.removeChild(that.allElementOnPath[i]);
                        that.allElementOnPathClassName.splice(i, 1);
                        that.allElementOnPath.splice(i, 1);
                    }
                    break;
                default:
            }
        }
    };

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };


}