var newgame = new Game();
newgame.initializeGame();

function Game() {
    this.mainwrapper = document.getElementsByClassName('main-wrapper')[0];
    this.movingBackGround = document.getElementsByClassName('buttom')[0];
    this.movingbackgroundLeftPosition = 0;

    this.maintimer;
    this.mainCounter = 0;
    var newplayer;
    var newopp;
    var that = this;

    this.initializeGame = function () {
        that.newplayer = new Player();
        that.newopp = new OpponentsandCoins();

        that.newopp.getcurrentplayer(that.newplayer);
        that.Startgame();
    };

    this.Startgame = function () {
        if (that.newplayer.isfalling == false) {
            that.mainCounter++;
            if (that.mainCounter % 60 == 0)
                that.newopp.makeRandomOpponent();

            that.moveBackGround();
            that.newplayer.jumpManager();
            that.newplayer.stateManager();
            that.newopp.moveAllElementOnPath();
            that.newopp.detectCollision();
        } else {
            that.newplayer.fallingPlayer();
        }

        that.maintimer = window.requestAnimationFrame(that.Startgame);
    };

    this.moveBackGround = function () {
        that.movingbackgroundLeftPosition -= 14;
        that.movingBackGround.style.left = that.movingbackgroundLeftPosition + "px";
    };
}
function Player() {
    this.player = document.getElementById('player');
    this.playernormalheight = 100;
    this.playerrollingheight = 50;
    this.movingPlayerTopPos = 100;
    this.fallingPlayerposition = 100;
    this.isfalling = false;
    this.playerCurrentHeight = 100;
    this.playernormalTopPosition = 100;
    this.playerrollingTopPosition = 150;
    this.ismoving = false;
    this.movingdirection;
    this.rollingplayerCounter = 0; //rollingplayerCounter ko value 30 bhayo bhane normal player hunxa
    this.playerstatus = 1; //1 huda normal player 0 huda rolling player
    var that = this;

    this.init = function () {
    };

    document.onkeyup = function (e) {
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
                        alert("right");
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

        if (that.rollingplayerCounter > 30) {
            that.normalPlayer();
            that.playerstatus = 1;
            that.ismoving = false;
            that.rollingplayerCounter = 0;
        } else {
            that.rollingplayerCounter++;
            that.player.style.height = that.playerrollingheight + "px";
            that.player.style.top = that.playerrollingTopPosition + "px";
            that.movingPlayerTopPos = that.playerrollingTopPosition;
            that.playerCurrentHeight = that.playerrollingheight;
            that.ismoving = true;

        }


    };

    this.normalPlayer = function () {
        if (!that.isfalling) {
            that.player.style.height = that.playernormalheight + "px";
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

    this.moveup = function () {
        that.ismoving = true;
        if (that.movingPlayerTopPos < 0) {
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
       
        that.player.style.width = "100px";
        that.player.style.height = "50px";
        that.player.style.background = "url(Images/fallingLimbo.png)";

        that.fallingPlayerposition += 5;
        that.player.style.top = that.fallingPlayerposition + "px";

        if (that.fallingPlayerposition > 600) {

        }
    };

}

function OpponentsandCoins() {

    this.mainwrapper = document.getElementsByClassName('main-wrapper')[0];
    this.allElementOnPath = [];
    this.allElementOnPathposition = [];
    this.allElementOnPathClassName = [];
    this.UpperopponentTopPosition = 100;
    this.UpperopponentHeight = 20;
    this.coinList = [];
    this.coinListpos = [];
    this.Loweropponentlist = [];
    this.Loweropponentlistposition = [];
    this.LoweropponentTopPosition = 150;
    this.LoweropponentHeight = 50;
    this.player;

    var that = this;

    this.getcurrentplayer = function (currentplayer) {
        that.player = currentplayer;
    };

    this.makeRandomOpponent = function () {
        var opponentDecider = that.getRandomArbitrary(0, 2);
        if (opponentDecider < 1) {
            that.makeLowerOpponent();
        }
        if (opponentDecider < 1.25 && opponentDecider > 0.5) {
            setTimeout(that.makeCoins, 100);

        }
        if (opponentDecider > 1) {
            that.makeUpperOpponent();
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
        for (var i = 0; i < that.allElementOnPath.length; i++) {
            if (that.allElementOnPathposition[i] < 0) {
                that.allElementOnPathposition.splice(that.allElementOnPathposition[i], 1);
                that.mainwrapper.removeChild(that.allElementOnPath[i]);
                that.allElementOnPathClassName.splice(that.allElementOnPathClassName[i], 1);
                that.allElementOnPath.splice(that.allElementOnPath[i], 1);
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
                    if ((that.allElementOnPathposition[i] <= 150 && that.allElementOnPathposition[i] >= 50) && that.player.movingPlayerTopPos + that.player.playerCurrentHeight >= that.LoweropponentTopPosition) {
                        that.player.isfalling = true;
                       
                    }
                    break;
                case "Upperopponent":
                    if ((that.allElementOnPathposition[i] <= 150 && that.allElementOnPathposition[i] >= 1) && that.player.movingPlayerTopPos < that.UpperopponentTopPosition + that.UpperopponentHeight) {
                        that.player.isfalling = true;
                       
                    }
                    break;
                case "Coin":
                    break;
                default:
            }
        }
    };

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    //    this.clearallTimer = function () {
    //        that.isfalling = true;
    //        that.fallingPlayerposition = that.movingPlayerTopPos;
    //        that.player.style.width = "100px";
    //        that.player.style.height = "50px";
    //        that.player.style.background = "url(Images/fallingLimbo.png)";
    //        that.fallingPlayerTimer = setInterval(that.fallingPlayer, 1);
    //    };
}