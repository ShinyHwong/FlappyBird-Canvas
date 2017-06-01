//绘制像素鸟
(function () {
    window.Bird = Class.extend({
        init : function () {
            this.width = 85;
            this.height = 60;
            this.x = (game.cvs.width - this.width)* 0.5; //保持在屏幕中央
            this.y = 100; //起始高度
            this.speed = 3;
            this.wing = 0; //翅膀状态 0 1 2
            //记录小鸟最高点时的帧数（时间）
            this.dropFrame = game.frameUtil.currentFrame;
            this.dy = 0; //下落量
            this.angle = 0; //旋转角度
            this.isUp = false; //正在下落的状态
            this.resist = 1; //上升阻力
            this.clickCanvas(); //点击上升事件
            this.die = false; //死亡判断
            this.dieIndex = 0; //死亡动画索引
        },
        render : function () {
            if (this.die) {
                //获取死亡图片每张的尺寸
                var diePicWidth = 1625/5;
                var diePicHeight = 828/6;
                var picCols = this.dieIndex % 5; //求出图片列数
                var picRows = parseInt(this.dieIndex/5); //求出图片行数
                //绘制死亡的图片
                game.ctx.drawImage(game.imageData.blood,picCols*diePicWidth,picRows*diePicHeight,diePicWidth,diePicHeight,this.x-diePicWidth/2,this.y,diePicWidth,diePicHeight);
                //绘制游戏结束提示
                game.ctx.drawImage(game.imageData.gameover,(game.cvs.width-626)/2,(game.cvs.height-300)/2);
                game.ctx.drawImage(game.imageData.startgame,(game.cvs.width-337)/2,game.cvs.height-150);
                return;
            }
            //翅膀3个状态影响绘出来的鸟
            game.ctx.save();
            game.ctx.translate(this.x + this.width*0.5, this.y+ this.height*0.5);
            game.ctx.rotate(this.angle * Math.PI /180);
            game.ctx.drawImage(game.imageData.bird,this.wing*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
            game.ctx.restore();
        },
        update : function () {
            //死亡动画更新
            if (this.die) {
                this.dieIndex++;
                //动画完毕，游戏定时器停止
                if (this.dieIndex > 30) game.pause();
                return;
            }

            //每10帧更新一次动画
            if (game.frameUtil.currentFrame % 10 === 0) {
                this.wing++;
                this.wing %= 3;
            }

            //下落状态
            if (!this.isUp) {
                //自由下落 h=1/2*g*t^2
                this.dy = 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame,2) * 0.001;
                //更新旋转
                this.angle += 1;
            }
            //上升状态
            else if (this.isUp) {
                this.resist++; //阻力越来越大
                this.dy = -15 + this.resist; //默认起始动力为15
                if (this.dy >= 0) {
                    this.isUp = false; //更新状态
                    //更新下落帧数（时间）
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }
            this.y += this.dy; //更新垂直位置
            //限制像素鸟活动区域
            if (this.y <= 0) this.y = 0; //封锁上空
            else if (this.y >= game.cvs.height - 48 -this.height) game.gameOver();
        },
        //点击上升
        clickCanvas : function () {
            var self = this;
            game.cvs.onmousedown = function () {
                self.isUp = true;
                self.angle = -25;
                self.resist = 1; //阻力复原
            }
        }
    })
})();