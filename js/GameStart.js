//点击游戏开始
(function () {
    window.GameStart = Class.extend({
        init: function () {
            this.isStart = false;
            this.clickStart();
        },
        clickStart: function () {
            var self = this;
            //绘制游戏开始画面
            if (!game.isClick && !self.isStart) {
                game.pause();
                game.ctx.drawImage(game.imageData.startgame, (game.cvs.width - 337) / 2, (game.cvs.height - 75) / 2);
            }
            document.body.onclick = function () {
                self.isStart = true;
                game.isClick = true;
                game.play();
                document.body.onclick = null;
            }
        }
    })
})();