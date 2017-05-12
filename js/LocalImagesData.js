//本地图片数据处理
(function () {
    window.LocalData = Class.extend({
        init : function () {
            this.allImageData = {}; //创建对象接收数据
        },
        //加载图片
        loadImage : function (jsonUrl, callBack) {
            var self = this; //备份指针
            //通过AJAX发送请求获取数据
            var request = new XMLHttpRequest();
            request.open('GET', jsonUrl);
            request.send();
            //监听数据传输情况执行回调函数
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status == 200) {
                    var loadedImagesCount = 0; //初始化接收到的数据量
                    //将接收到的json转换成对象
                    var responseObj = JSON.parse(request.responseText);
                    //responseObj.images为一个数组，每个数组中有一个对象
                    var imageArr = responseObj.images;
                    //遍历数组创建每个图片的DOM对象
                    for (var i = 0; i < imageArr.length; i++) {
                        var img = new Image();
                        img.src = imageArr[i].src;
                        img.index = i; //创建图片索引便于查找
                        //图片加载完成后保存图片
                        img.onload = function () {
                            //这里的this为图像DOM对象
                            loadedImagesCount++;
                            //将对象保存为 name：src格式
                            var key = imageArr[this.index].name;
                            self.allImageData[key] = this;
                            //返回数据 所有图片对象 所有图片的数量 已经加载了的图片数量
                            callBack(self.allImageData,imageArr.length,loadedImagesCount)
                        }
                    }
                }
            }
        }
    })
})();