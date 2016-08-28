(function(){
	function Util(){
       
	}
	Util.prototype = {
        main:function(){
          this.carousel();
          this.showMenu();
        },
        //广告部分轮播图
        carousel:function(){
            var $this = $(this);
            var $ul = $('.ad ul');
            var $li = $('.ad ul li');
            var $liLength = $li.width();
            var $ulLength = $ul.width();//css获取得到的元素宽度带单位
            var $carouselBtn = $('.carouselBtn');
            var num = 100;
            var timer;
            var index = 1; 
            var animated=false;          
            function move(offset){
                animated=true;
                var newLeft=$ul.offset().left+offset;
                $ul.animate({left:newLeft+'px'},"slow",function(){
                    animated=false;
                    if(index==4){
                        $ul.css("left",-$liLength+"px");
                        index=1; 
                    }
                    if(index==0){
                        $ul.css("left",-3*$liLength+"px");
                        index=3;
                    }
                });
            }
            $("#pre").click(function(){
                if(animated){
                    return;
                }
                $carouselBtn.eq(index-1).removeClass('carouselActive');
                move(-$liLength);
                index++;
                if(index == 4){
                    $carouselBtn.eq(0).addClass('carouselActive');
                }
                $carouselBtn.eq(index-1).addClass('carouselActive');                              
            })
            $("#next").click(function(){
                if(animated){
                    return;
                }
                if(index == 4){
                    $carouselBtn.eq(0).removeClass('carouselActive');
                }
                $carouselBtn.eq(index-1).removeClass('carouselActive');
                move($liLength);
                index--;
                if(index == 0){
                   $carouselBtn.eq(2).addClass('carouselActive'); 
                }
                $carouselBtn.eq(index-1).addClass('carouselActive');
            })
            function start(){
                timer=setInterval(function(){
                    $("#pre").trigger("click");
                },2000);
            }  
            start(); 
            function end(){
                clearInterval(timer);
            }
            $(".ad").mouseenter(end);
            $(".ad").mouseleave(start);

            $(window).resize(function(){
                $liLength = $li.width();
                $ulLength = $ul.width();
                $ul.css("left",-index*$liLength+"px");
            });

        },
        showMenu:function(){
            $(window).resize(function(){
                if($(window).width() < 480){
                    $('.headerBar .xs-visible').click(function(){
                        $('.headerBar .headerBarMenu').toggle();
                    });
                }else{
                    $('.headerBar .headerBarMenu').show();
                }
            })
        }
    }
	var util = new Util();
	util.main();
})()