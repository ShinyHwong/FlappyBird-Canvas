//游戏核心
(function () {
    window.Game = Class.extend({
        init: function (option) {
            option = option || {};
            var self = this; //备份指针
            this.fps = option.fps || 60; //设置帧数
            this.frameUtil = new FrameUtil();
            //获取canvas上下文
            this.cvs = document.getElementById(option.canvas);
            this.ctx = this.cvs.getContext('2d');
            //获取本地数据
            this.localImage = new LocalData();
            this.imageData = {}; //创建对象接收数据
            this.localImage.loadImage('imageData.json', function (imageData, imageCount, loadedImages) {
                //当图片加载完成
                if (imageCount == loadedImages) {
                    //将图片数据（name-url）赋值到Game.imageData上
                    self.imageData = imageData;
                    self.play(); //图片加载完成运行游戏
                }
            });
            this.isRun = true;
        },
        //运行游戏
        play: function () {
            var self = this; //备份指针
            this.timer = setInterval(function () {
                self.playLoop(); //执行每帧动画
            }, 1000 / self.fps); //每帧需要的时间

            //绘制背景
            this.house = new BackGround({
                image: self.imageData.bg,
                y: self.cvs.height - 48 - 256 - 50,
                width: 300,
                height: 256,
                speed: 1
            });
            //绘制树
            this.tree = new BackGround({
                image: self.imageData.tree,
                y: self.cvs.height - 48 - 216,
                width: 300,
                height: 216,
                speed: 2
            });
            //绘制地板
            this.floor = new BackGround({
                image: self.imageData.floor,
                y: self.cvs.height - 48,
                width: 48,
                height: 48,
                speed: 3
            });
            //绘制管道
            this.pipeArr = [new Pipe()];
            // this.start = new GameStart();
            //绘制像素鸟
            this.bird = new Bird();
        },
        //游戏每帧的画面
        playLoop: function () {
            //清屏
            this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
            //获取真实帧数
            this.frameUtil.render();
            this.ctx.fillStyle = 'green';
            this.ctx.font = '20px "微软雅黑"';
            //绘制帧数表
            this.ctx.fillText('FPS: ' + this.frameUtil.realFPS, 15, 30);
            //绘制得分表
            this.ctx.fillText('Score: ' + parseInt(this.frameUtil.currentFrame / 10), this.cvs.width - 150, 30);
            //背景移动更新
            this.house.render();
            this.house.update();
            this.tree.render();
            this.tree.update();
            this.floor.render();
            this.floor.update();

            //管道移动更新
            //游戏正在运行并且每100帧创建一个管道
            if (this.isRun && this.frameUtil.currentFrame % 100 === 0) {
                this.pipeArr.push(new Pipe());
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                //先更新再渲染
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }

            //像素鸟更新
            this.bird.update();
            this.bird.render();
        },
        //暂停
        pause: function () {
            clearInterval(this.timer);
        },
        //游戏结束
        gameOver: function () {
            //背景暂停
            this.house.pause();
            this.tree.pause();
            this.floor.pause();
            //管道暂停
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }
            //游戏结束
            this.isRun = false;
            //鸟死亡
            this.bird.die = true;
            document.body.onclick = function () {
                window.location.reload()
            }
        }
    })
})();