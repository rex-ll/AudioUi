# CTRaudio

> 基于jQuery的语音播放插件

### 使用指南

首先引入jQuery 和 对应js还有css

```html
<link rel="stylesheet" href="css/ctraudio.css">
<!--css可根据实际情况自定义-->
    <script src="js/jquery.min.js"></script>
    <script src="js/ctraudio.js"></script>
```
html模板

```html
<div class="audio">
    <audio src="" preload hidden></audio>
    <div class="audio-area">
        <div class="audio-length"></div>
        <div class="audio-play"></div>
    </div>
    <i class="audio-unread"></i>
    <div class="audio-load-bg">
        <div class="audio-loader"></div>
    </div>
</div>
```

调用方法

```js
//支持多对象
$('.audio').ctrAudio({
        autoplay:false,//是否自动播放
        src:'audio/mp3.mp3'//资源路径（也可直接在html写死）
});
```

[demo](https://doubleray.win/H5AudioUi/demo.html)