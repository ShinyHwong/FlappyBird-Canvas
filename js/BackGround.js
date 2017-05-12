//绘制背景
(function () {
    window.BackGround = Class.extend({
        //设置属性
        init : function (option) {
            option = option || {};
            this.image = option.image;
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;
            this.count = Math.ceil(game.cvs.width / option.width) + 1;
            this.speed = option.speed || 1;
        },
        //渲染背景
        render : function () {
            //遍历绘制覆盖全屏的背景
            for (var i = 0; i < this.count; i++) {
                game.ctx.drawImage(this.image,this.x+this.width*i,this.y,this.width,this.height);
            }
        },
        //运动更新
        update : function () {
            this.x -= this.speed; //向左移
            if (-this.x >= this.width) { //移出超过一个宽度
                this.x = 0; //还原位置
            }
        },
        //暂停动画
        pause : function () {
            this.speed = 0;
        }
    })
})();
