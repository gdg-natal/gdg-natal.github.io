(function() {
    "use strict";
    window['AnimationConfig'] = {};
    function Animation() {
        this.animations = {
            bounce: "anim-bounce",
            ease: "anim-ease",
            none: "anim-none"
        };
        this.config = window['AnimationConfig'];
        this.timeLine = {};
    }

    Animation.prototype = {
        resetAnimations: function(selector) {
            var classes = $(selector).attr("class").split(" ");
            for (var i in classes) {
                var _class = classes[i];
                if (_class.indexOf("anim") > -1) {
                    $(selector).removeClass(_class);
                }
            }
        },
        set: function(selector, animation) {
            this.resetAnimations(selector);
            $(selector).addClass(this.animations[animation]);
        },
        animate: function() {
            if(this.config.disableTimeline ===  undefined || this.config.disableTimeline === false){
                if(this.config.animate === undefined || this.config.animate === true){
                    var time = 0;
                    var self = this;
                    setInterval(function() {
                        if (self.timeLine[time] !== undefined) {
                            self.timeLine[time]();
                        }
                        time++;
                    }, 1);
                }
                else{
                    for(var i in this.timeLine){
                        this.timeLine[i]();
                    }
                }
            }
        }
    }

    var animation = new Animation();

    $(document).ready(function() {

        $('html, body').css({
            'overflow': 'hidden',
            'height': '100%'
        });
        $(".presentation").css("opacity","0");
        animation.timeLine = {
            300: function() {
                animation.set(".logo", "bounce");
                $(".logo").removeClass("closed");
            },
            500: function() {
                animation.set(".logo, .nav, .title", "ease");
                $(".logo").addClass("up");
            },
            1000: function() {
                $(".header").removeClass("openend");
                $(".header").addClass("closed");
                $(".section.main").removeClass("openend");
                $(".section.main").addClass("closed");
                $(".nav").addClass("opened");
                $(".nav").removeClass("closed");
                $(".header").css("position", "absolute");
                $(".title").css("opacity", "0");
                $('html, body').css({
                    'overflow': 'auto',
                    'height': 'auto'
                });
            },
            1200: function() {
                $(".logo").css("position", "fixed");
                $(".nav").removeClass("opened");
                $(".title").css("display", "none");
                $(".presentation").css("opacity","1");
            }

        }
        if(window['AnimationConfig'].disableTimeline === true){
            $('html, body').css({
                'overflow': 'auto',
                'height': 'auto'
            });
        }
        animation.animate();

        $("#initiatives").owlCarousel({
            singleItem: true,
        });

        $(".navigate").click(function(e){
        	e.preventDefault();

        	var target = $(this).attr("href");
        	
        	var scrollPosition = $(target).offset().top;

        	$('body').animate({scrollTop:scrollPosition - 40},300);

            $(".mobile.collapse-menu").hide();

        });

        $(".mobile.menu").click(function(e){
            e.preventDefault();
            $(".mobile.collapse-menu").toggle();
        });

    });

}());
