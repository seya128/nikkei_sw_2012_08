enchant()

window.onload = ->

  game = new Game(320, 320)

  game.twitterRequest("statuses/home_timeline")

  game.onload = ->

    tweets = game.twitterAssets["statuses/home_timeline"]

    tweets.forEach (tweet)->
      
      user = tweet.user.toSprite()
      user.scaleX = user.scaleY = 0.5 + Math.random()
      user.x = (320 - user.width) * Math.random()
      user.y = (320 - user.height) * Math.random()
      game.rootScene.addChild(user);


  game.start()

