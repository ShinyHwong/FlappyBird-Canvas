//获得每秒真实的帧数以及总帧数
(function () {
    window.FrameUtil = Class.extend({
        //设置默认属性
        init : function () {
            //当前的帧数
            this.currentFrame = 0;
            //起始帧数
            this.startFrame = 0;
            //起始时间
            this.startTime = new Date();
            //真实的帧数
            this.realFPS = 0;
        },
        //每一帧都要渲染
        render : function () {
            this.currentFrame++;
            var currentTime = new Date();
            //算出真实FPS
            if (currentTime - this.startTime >= 1000) {
                this.realFPS = this.currentFrame - this.startFrame;
                //更新起始时间和起始帧数
                this.startFrame = this.currentFrame;
                this.startTime = currentTime;
            }
        }
    })
})();
