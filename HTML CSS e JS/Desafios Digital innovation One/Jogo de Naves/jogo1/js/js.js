function start() {
    $("#start").hide();

    $("#gameBackground").append("<div id='player' class='anima1'></div>");
    $("#gameBackground").append("<div id='enemy1' class='anima2'></div>");
    $("#gameBackground").append("<div id='enemy2'></div>");
    $("#gameBackground").append("<div id='friend' class='anima3'></div>");

    var endGame = false;
    var canShoot = true;
    var game = {};
    var velocity = 5;
    var positionY = parseInt(Math.random() * 334);
    var key = {
    	W: 87,
    	S: 83,
    	D: 68
    }

    //Verify key pressed

    game.press = [];

    $(document).keydown(function(e) {
    	game.press[e.which] = true;
	});

	$(document).keyup(function(e) {
		game.press[e.which] = false;
	});

	//Loop timer

    game.timer = setInterval(loop,30);

    function loop() {
    	moveBackground();
    	movePlayer();
    	moveEnemy1();
    	moveEnemy2();
    	moveFriend();
    	collision();
    }

    function moveBackground() {
    	left = parseInt($("#gameBackground") .css("background-position"));
    	$("#gameBackground") .css("background-position", left-1);
    }

    function movePlayer() {
    	if (game.press[key.W]) {
    		var top = parseInt($("#player") .css("top"));
    		$("#player") .css("top", top-10);

    		if (top<=0) {
    			$("#player") .css("top", top+10);
    		}
    	}
    	if (game.press[key.S]) {
    		var top = parseInt($("#player") .css("top"));
    		$("#player") .css("top", top+10);

    		if (top>=434) {
    			$("#player") .css("top", top-10);
    		}
    	}
    	if (game.press[key.D]) {
    		shoot();
    	}
    }

    function moveEnemy1() {
    	positionX = parseInt($("#enemy1") .css("left"));
    	$("#enemy1") .css("left", positionX-velocity);
    	$("#enemy1") .css("top", positionY);

    	if (positionX<=0) {
    		positionY = parseInt(Math.random() * 334);
    		$("#enemy1") .css("left", 694);
    		$("#enemy1") .css("top", positionY);
    	}
    }

    function moveEnemy2() {
    	positionX = parseInt($("#enemy2") .css("left"));
    	$("#enemy2") .css("left", positionX-3);

    	if (positionX<=0) {
    		$("#enemy2") .css("left", 775);
    	}
    }

    function moveFriend() {
    	positionX = parseInt($("#friend") .css("left"));
    	$("#friend") .css("left", positionX+1);

    	if (positionX>906) {
    		$("#friend") .css("left", 0);
    	}
    }

    function shoot(){

    	if (canShoot == true) {

    		canShoot = false;

    		top = parseInt($("#player") .css("top"));
    		positionX = parseInt($("#player") .css("left"));
    		shootX = positionX + 190;
    		topShoot = top + 37;
    		$("#gameBackground").append("<div id='shoot'></div>");
    		$("#shoot") .css("top", topShoot);
    		$("#shoot") .css("left", shootX);

    		var timeShoot = window.setInterval(executeShoot, 30);
    	}

    	function executeShoot() {
    		positionX = parseInt($("#shoot") .css("left"));
    		$("#shoot") .css("left", positionX+15);

    		if (positionX>900) {
    			window.clearInterval(timeShoot);
    			timeShoot = null;
    			$("#shoot").remove();
    			canShoot = true;
    		}
    	}
    }

    function collision() {
    	var collision1 = ($("#player").collision($("#enemy1")));
    	var collision2 = ($("#player").collision($("#enemy2")));
    	var collision3 = ($("#shoot").collision($("#enemy1")));
    	var collision4 = ($("#shoot").collision($("#enemy2")));
    	var collision5 = ($("#player").collision($("#friend")));
    	var collision6 = ($("#enemy2").collision($("#friend")));

    	if (collision1.length>0) {
    		enemy1X = parseInt($("#enemy1") .css("left"));
    		enemy1Y = parseInt($("#enemy1") .css("top"));
    		explosion1(enemy1X, enemy1Y);

    		positionY = parseInt(Math.random() * 334);
    		$("#enemy1") .css("left", 694);
    		$("#enemy1") .css("top", positionY);
    	}

    	if (collision2.length>0) {
    		enemy2X = parseInt($("#enemy2") .css("left"));
    		enemy2Y = parseInt($("#enemy2") .css("top"));
    		explosion2("enemy2X, enemy2Y");

    		$("#enemy2").remove();

    		repositionEnemy2();
    	}

    	if (collision3.length>0) {
    		enemy1X = parseInt($("#enemy1") .css("left"));
    		enemy1Y = parseInt($("#enemy1") .css("top"));

    		explosion1(enemy1X, enemy1Y);
    		$("shoot") .css("left", 950);

    		positionY = parseInt(Math.random() * 334);
    		$("#enemy1") .css("left", 694);
    		$("#enemy1") .css("top", positionY);
    	}

    	if (collision4.length>0) {
    		enemy2X = parseInt($("#enemy2") .css("left"));
    		enemy2Y = parseInt($("#enemy2") .css("top"));
    		$("#enemy2").remove();

    		explosion2(enemy2X, enemy2Y);
    		$("shoot") .css("left", 950);

    		repositionEnemy2();
    	}

    	if (collision5.length>0) {
    		repositionFriend();
    		$("#friend").remove();
    		}
    	}

    	if (collision6.length>0) {
    		friendX = parseInt($("#friend") .css("left"));
    		friendY = parseInt($("#friend") .css("top"));
    		explosion3(friendX, friendY);
    		$("#friend").remove();

    		repositionFriend();
    	}
    }

    function explosion1(enemy1X, enemy1Y) {
    	$("#gameBackground").append("<div id='explosion1'></div>");
    	$("#explosion1") .css("background-image", "url(imgs/explosao.png)");
    	var div=$("#explosion1");
    	div.css("top", enemy1Y);
    	div.css("left", enemy1X);
    	div.animate({width: 200, opacity: 0}, "slow");

    	var timeExplosion = window.setInterval(removeExplosion, 1000);

    	function removeExplosion() {
    		div.remove();
    		window.clearInterval(timeExplosion);
    		timeExplosion = null;
    	}
    }

    function repositionEnemy2() {
    	var timeCollision4 = window.setInterval(reposition4, 5000);

    	function reposition4() {
    		window.clearInterval(timeCollision4);
    		timeCollision4 = null;

    		if (endGame == false) {
    			$("#gameBackground").append("<div id='enemy2'></div>");
    		}
    	}
    }

    function explosion2(enemy2X, enemy2Y) {
    	$("#gameBackground").append("<div id='explosion2'></div>");
    	$("#explosion2") .css("background-image", "url(imgs/explosao.png)");
    	var div2=$("#explosion2");
    	div2.css("top", enemy2Y);
    	div2.css("left", enemy2X);
    	div2.animate({width: 200, opacity: 0}, "slow");

    	var timeExplosion2 = window.setInterval(removeExplosion2, 1000);

    	function removeExplosion2() {
    		div2.remove();
    		window.clearInterval(timeExplosion);
    		timeExplosion2 = null;
    	}
    }

    function repositionFriend() {
    	var timeFriend = window.setInterval(reposition6, 6000);

    	function reposition6() {
    		window.clearInterval(timeFriend);
    		timeFriend = null;

    		if (endGame == false) {
    			$("#gameBackground").append("<div id='friend' class='anima3'></div>");
    		}
    	}
    }

    function explosion3(friendX, friendY) {
    	$("#gameBackground").append("<div id='explosion3' class='anima4'></div>");
    	$("#explosion3") .css("top", friendY);
    	$("#explosion3") .css("left", friendX);
    	var timeExplosion3 = window.setInterval(resetExplosion3, 1000);
    	function resetExplosion3() {
    		$("#explosion3").remove();
    		window.clearInterval(timeExplosion3);
    		timeExplosion3 = null;
    	}
    }
}
