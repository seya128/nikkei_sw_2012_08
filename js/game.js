enchant();

window.onload = function() {
  
  var game = new Game(320, 320);

  game.twitterRequest("statuses/home_timeline");

  game.onload = function() {

    var tweets = game.twitterAssets["statuses/home_timeline"];

    var count = 0;

    var wally = tweets[0].user.screen_name;

    tweets.forEach(function(tweet) {

      var user = tweet.user.toSprite();

      if (tweet.user.screen_name !== wally) {
        count += 1;
        user.addEventListener(Event.TOUCH_START, function() {
          game.rootScene.removeChild(user);
          count -= 1;
          if (count <= 0) {
            game.end(1 / tl.time, tl.time + "秒で見つけた");
            return;
          }
          var speed = 5;

          tweet.text.split("").forEach(function(chr, i) {
            var lab = new Label(chr);
            lab.x = user.x;
            lab.y = user.y;

            var theta = 2 * Math.PI * i / tweet.text.length;
            var vx = speed * Math.cos(theta);
            var vy = speed * Math.sin(theta);
            lab.addEventListener(Event.ENTER_FRAME, function() {
              lab.x += vx;
              lab.y += vy;
            });
            game.rootScene.addChild(lab);
          });
        });
      }

      // 
      // ユーザーアイコンの処理
      //
      user.scaleX = user.scaleY = 0.5 + Math.random();
      user.x = (320 - user.width) * Math.random();
      user.y = (320 - user.height) * Math.random();
      // アイコン移動
      for (var i = 0; i<2 + Math.random() * 3; i += 1) {  // 2-5点の間をランダムに移動する
        user.tl.tween({
          time:20 + Math.random() * 20,
          x:(320 - user.width) * Math.random(),
          y:(320 - user.height) * Math.random(),
          easing:enchant.Easing.SIN_EASEINOUT}  // イージングの設定
          );
      }
      user.tl.tween({time:30, x:user.x, y:user.y, easing:enchant.Easing.SIN_EASEINOUT}).loop();

      game.rootScene.addChild(user);
    });
  };

  game.start();
};

