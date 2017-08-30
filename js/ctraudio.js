(function () {
    $.fn.ctrAudio = function (options) {
        var $this = $(this);
        var defaultOptions = {
            //是否自动播放
            autoplay: false,
            //音频地址
            src: ''
        };
        function Plugin($context) {
            //最外层DOM
            this.$context = $context;
            //audio标签
            this.$audio = $context.find('audio');
            //audio对象
            this.audio = this.$audio[0];
            //点击区域
            this.audio_area = $context.find('.audio-area');
            //音频时长
            this.audio_length = $context.find('.audio-length');
            //播放动画
            this.audio_play = $context.find('.audio-play');
            //是否已读
            this.audio_read = $context.find('.audio-unread');
            //+++++++++属性+++++++++
            this.currentState = 'pause';
            //this.preAudioId = null;
            this.settings = $.extend(true, defaultOptions, options);
            //初始化
            this.init();
        };
        Plugin.prototype = {
            init: function () {
                var _this=this;
                //设置src
                if (this.settings.src != '') {
                    this.setSrc(this.settings.src,function () {
                        _this.playInit();
                    });
                }else {
                    if (this.$audio.attr('src')!=''){
                        this.playInit();
                    }else {
                        alert(this.audio+'音频源获取出错');
                    }
                }
            },
            playInit:function () {
                var _this=this;
                this.already(this.$audio,function () {
                    _this.events();
                    if (_this.settings.autoplay){
                        _this.Play();
                    }
                });
            },
            //设置文件路径
            setSrc: function (src, callback) {
                //this.Pause();
                this.audio.src = src;
                (callback && typeof(callback) === "function") && callback();
            },
            //播放
            Play: function () {
                var _this = this;
                if (this.currentState === 'play') {
                    this.Pause();
                    return;
                }
                this.audio.play();
                this.audio_play.addClass('play');
                this.$audio.off('ended').one('ended', function () {
                    _this.audio_play.removeClass('play');
                });
                this.currentState = 'play';
                if (!this.audio_read.hasClass('audio-alread')) {
                    this.audio_read.addClass('audio-alread');
                }
            },
            //暂停
            Pause: function () {
                this.audio.pause();
                this.currentState = 'pause';
                this.audio_play.removeClass('play');
            },
            //获取总时间
            updateTotalTime: function (that,or,callback) {
                var _this = this,
                    minutes = '00',
                    seconds = '00',
                    audioTime = '';
                if (or) {
                    var time = that[0].duration;
                    minutes = _this.getAudioMinutes(time);
                    seconds = _this.getAudioSeconds(time);
                    if (minutes != '00' || seconds != '00') {
                        audioTime = minutes + ":" + seconds;
                    }
                } else {
                    audioTime = '语音错误';
                }
                that.siblings('.audio-load-bg').fadeOut();
                this.audio_length.text(audioTime);
                (callback && typeof(callback) === "function") && callback();
            },
            already:function (audio,callback) {
                var _this=this;
                switch (audio[0].readyState) {
                    case 4:
                        _this.updateTotalTime(audio, true,callback);
                        break;
                    default:
                        audio.one('canplaythrough', function () {
                            if ($(this)[0].readyState != 4) {
                                _this.updateTotalTime($(this), false,callback);
                            } else {
                                _this.updateTotalTime($(this), true,callback);
                            }
                        });
                        //主动触发一次加载
                        if(audio[0].readyState===0){
                            audio[0].load();
                        }
                        break;
                }
            },
            events:function () {
                var _this=this;
                this.audio_area.on('click',function () {
                    _this.Play();
                });
            },
            //获取时间秒
            getAudioSeconds: function (string) {
                var string = string % 60;
                string = this.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //获取时间分
            getAudioMinutes: function (string) {
                var string = string / 60;
                string = this.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //时间+0
            addZero: function (word, howManyZero) {
                var word = String(word);
                while (word.length < howManyZero) word = "0" + word;
                return word;
            }
        };
        var obj={};
        $this.each(function(index,element){
            obj['weixinAudio'+index] = new Plugin($(this));
        }); //多个执行返回对象
        return obj;
    }
})(jQuery)
