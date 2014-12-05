var newgame = new Game();
newgame.Startgame();

function Game() {

    this.player = document.getElementById('player');
    this.mainwrapper = document.getElementsByClassName('main-wrapper')[0];

    this.movingPlayerTopPos = 500;

    this.playernormalheight = 100;
    this.playerrollingheight = 50;

    this.playerCurrentHeight = 100;

    this.playernormalTopPosition = 500;
    this.playerrollingTopPosition = 550;

    this.playertimer;

    this.upperOpponentmakingTimer;
    this.Upperopponentlist = [];
    this.Upperopponentlistposition = [];


    this.ismoving = false;
    this.RandomOpponentmakingTimer;


    this.LowerOpponentmakingTimer;
    this.Loweropponentlist = [];
    this.Loweropponentlistposition = [];

    var that = this;

    this.Startgame = function () {

        that.RandomOpponentmakingTimer = setInterval(that.makeRandomOpponent, 1000);
        that.LowerOpponentmovingTimer = setInterval(that.moveLoweropponent, 10);
        that.UpperOpponentmovingTimer = setInterval(that.moveUpperopponent, 10);

    };

    document.onkeyup = function (e) {

        switch (e.keyCode) {
            case 37:
                {

                    break;
                }
            case 38:
                {
                    if (that.ismoving == false)
                        that.playertimer = setInterval(that.moveup, 1);
                    break;
                }
            case 39:
                {
                    alert("right");

                    break;
                }
            case 40:
                {
                    if (that.ismoving == false)
                        that.RollingPlayer();
                    break;
                }
        }
    };

    this.RollingPlayer = function () {
        that.player.style.height = that.playerrollingheight + "px";
        that.player.style.top = that.playerrollingTopPosition + "px";
        that.movingPlayerTopPos = that.playerrollingTopPosition;
        that.playerCurrentHeight = that.playerrollingheight;
        that.ismoving = true;
        setTimeout(that.normalPlayer, 500);

    };

    this.normalPlayer = function () {
        that.player.style.height = that.playernormalheight + "px";
        that.player.style.top = that.playernormalTopPosition + "px";
        that.movingPlayerTopPos = that.playernormalTopPosition;
        that.playerCurrentHeight = that.playernormalheight;
        that.ismoving = false;
    };
    this.moveup = function () {

        that.ismoving = true;
        if (that.movingPlayerTopPos < 400) {
            clearInterval(that.playertimer);
            that.playertimer = setInterval(that.movedown, 1);

        } else {
            that.movingPlayerTopPos -= 2;
        }
        that.player.style.top = that.movingPlayerTopPos + "px";
    };

    this.movedown = function () {
        if (that.movingPlayerTopPos > 500) {
            clearInterval(that.playertimer);
            that.ismoving = false;
        } else {
            that.movingPlayerTopPos += 2;
        }
        that.player.style.top = that.movingPlayerTopPos + "px";
    };


    this.makeUpperOpponent = function () {
        var element = document.createElement('div');
        element.className = 'Upperopponent';

        that.mainwrapper.appendChild(element);
        that.Upperopponentlistposition.push(1100);
        that.Upperopponentlist.push(element);


    };

    this.makeLowerOpponent = function () {
        var element = document.createElement('div');
        element.className = 'Loweropponent';

        that.mainwrapper.appendChild(element);
        that.Loweropponentlistposition.push(1100);
        that.Loweropponentlist.push(element);

    };



    this.moveUpperopponent = function () {


        for (var i = 0; i < that.Upperopponentlist.length; i++) {
            if (that.Upperopponentlistposition[i] < 0) {
                that.Upperopponentlistposition.splice(that.Upperopponentlistposition[i], 1);
                that.mainwrapper.removeChild(that.Upperopponentlist[i]);

                that.Upperopponentlist.splice(that.Upperopponentlist[i], 1);

            } else {
                that.Upperopponentlistposition[i] -= 10;
                that.Upperopponentlist[i].style.left = that.Upperopponentlistposition[i] + "px";
            }

        }
        that.detectCollision();

    };

    this.moveLoweropponent = function () {


        for (var i = 0; i < that.Loweropponentlist.length; i++) {
            if (that.Loweropponentlistposition[i] < 0) {
                that.Loweropponentlistposition.splice(that.Loweropponentlistposition[i], 1);
                that.mainwrapper.removeChild(that.Loweropponentlist[i]);

                that.Loweropponentlist.splice(that.Loweropponentlist[i], 1);

            } else {
                that.Loweropponentlistposition[i] -= 10;
                that.Loweropponentlist[i].style.left = that.Loweropponentlistposition[i] + "px";
            }

        }
        that.detectCollision();

    };
    this.detectCollision = function () {

        for (var i = 0; i < that.Loweropponentlist.length; i++) {
            if ((that.Loweropponentlistposition[i] <= 150 && that.Loweropponentlistposition[i] >= 50) && that.movingPlayerTopPos + that.playerCurrentHeight > 550) {
                // alert(that.movingPlayerTopPos +" " + that.playerCurrentHeight);

                alert("Crashed");
            }
        }
        for (var i = 0; i < that.Upperopponentlist.length; i++) {
            if ((that.Upperopponentlistposition[i] <= 150 && that.Upperopponentlistposition[i] >= 1) && that.movingPlayerTopPos < 520) {
                // alert(that.movingPlayerTopPos +" " + that.playerCurrentHeight);

                alert("Crashed");
            }
        }
    };

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;

    };

    this.makeRandomOpponent = function () {

        var opponentDecider = that.getRandomArbitrary(0, 2);
      //  alert(opponentDecider);
        if (opponentDecider < 1) {
            that.makeLowerOpponent();
        }
        else {
            that.makeUpperOpponent();
        }
    };
}