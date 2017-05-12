//绘制管道
(function () {
    window.Pipe = Class.extend({
        init : function () {
            this.dir = Math.round(Math.random()); //方向为0或1
            this.width = 148;
            //管道随机高度范围 100~屏幕高度一半
            this.height = Math.random()*(game.cvs.height/2 - 50) + 50;
            this.x = game.cvs.width;
            //dir为0时表示上方的管道，y=0；dir为1表示下方的管道
            this.y = this.dir == 0 ? 0 : game.cvs.height - 48 - this.height;
            this.speed = 3;
        },
        //根据随机方向绘制管道
        render : function () {
            if (this.dir === 0) { //上方的管道
                game.ctx.drawImage(game.imageData.pipe1,0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }
            else if (this.dir === 1) { //下方的管道
                game.ctx.drawImage(game.imageData.pipe0,0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },
        //更新管道移动
        update : function () {
            this.x -= this.speed;
            for (var i = 0; i < game.pipeArr.length; i++) {
                if (game.pipeArr[i].x <= -this.width) {
                    game.pipeArr.splice(i,1);
                }
            }
            //碰撞检测，进入管道区域才需要判断（x值）
            if (game.bird.x+game.bird.width >= this.x && game.bird.x <= this.x+this.width) {
                //在管道区域判断y值
                if (this.dir === 0 && game.bird.y < this.height) {
                    game.gameOver();
                }
                else if(this.dir === 1 && game.bird.y + game.bird.height > game.cvs.height - 48 -this.height) {
                    game.gameOver();
                }
            }
        },
        //暂停
        pause : function () {
            this.speed = 0;
        }
    })
})();