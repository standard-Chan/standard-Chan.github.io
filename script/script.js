    $(document).ready(function(){
        var $slideImg, $nav;
        var scrollTop, winHeight, cntHeight, opac, cntTop, cntEnd, ToptoEnd, bannerLeft, hover, click3, click4,
        moveSecTop, moveSec, moveIndex, menuOp;
        init();
        initEvent();
    })

    var init = function(){
        scrollTop=0;
        bannerLeft=0;
        click3=0;
        click4=0;
        menuOp=true;
        $nav = $(".header a");
    }
    var initEvent = function(){
        start();
        window.addEventListener('load', function() {
          // body의 height를 살짝 늘리는 코드
        document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
        // scroll를 제어 하는 코드
        setTimeout(scrollTo, 0, 0, 1);
        }, false);


        $(window).resize(function(){
            $(".slide").width($(window).width());
            slideImg($(".scene.three .slide img"));
            slideImg($(".scene.four .slide img"));
            if($(window).width()<1025){ // 모바일
                $(".exImage img").width($(window).width()*0.8);
                $(".scene.five").height($(".content .box").height()+200);
            }
            else if($(window).width()>1025){ // PC
                $(".exImage img").width($(".content .box").width()*0.33);
                $(".scene.five").height($(".content .box").height()+1000);
            }
        })

        $nav.on("click", function(){                // nav 클릭 이벤트
            $(".header").fadeOut("slow");
            moveIndex = $(this).parent("li").index();
            moving(moveIndex);
            menuOp=false;
            return false;
        });

        $(".menuOpen").click(function(){
            if (menuOp){
                $(".header").fadeOut("slow");
                menuOp=false;
            }
            else {
                $(".header").fadeIn('slow');
                menuOp=true;
            }
        })
        $(".slide .left").click(function(){ //슬라이드 왼쪽 클릭
            $slideImg = $(this).parent().children("img");
                $slideImg.each(function(){
                    if($(window).width()>1000){
                        $(this).animate({"left": $(this).position().left+500},1000);
                    }
                    else{
                        $(this).animate({"left": $(this).position().left+566+15},500);
                    }

                });
            })
        $(".slide .right").click(function(){ //슬라이드 오른쪽 클릭
            $slideImg = $(this).parent().children("img");
            if ($(window).width() < Number($($slideImg).last().css('left').replace('px',''))+Number($($slideImg).last().css('width').replace('px',''))) {
                $slideImg.each(function(){
                    if($(window).width()>1000){
                        $(this).animate({"left": $(this).position().left-500},1000);
                    }
                    else {
                        $(this).animate({"left": $(this).position().left-566-15},500);
                    }
                });
            }
        })

        $(window).scroll(function(){    //scroll 이벤트
            winHeight = $(window).height();
            scrollTop = $(window).scrollTop();
            if(scrollTop < $(".scene.one").offset().top){ // 제목 타이틀 구간
                fixed($(".title .content")); 
                noneFixed($(".scene.one .content"));
                noneFixed($(".scene.two .content"));
                noneFixed($(".scene.three .content"));
                noneFixed($(".scene.four .content"));
                cntTop = 0;
                cntEnd = $(".scene.one").offset().top;
                $(".title .name").css({opacity:1-opacCal(scrollTop, cntEnd*0.5, cntEnd)});
                $(".title .sub").css({opacity:1-opacCal(scrollTop, cntEnd*0.5, cntEnd)});    
            }
            else if ($(".scene.one").offset().top < scrollTop && scrollTop < $(".scene.two").offset().top){ // 첫번째 콘텐츠 구간
                if (menuOp){    // 네비게이션 제거
                $(".header").fadeOut("slow");
                menuOp=false;
            }
                noneFixed($(".title .content"));
                noneFixed($(".scene.two .content"));
                noneFixed($(".scene.three .content"));
                noneFixed($(".scene.four .content"));
                fixed($(".scene.one .content"));
                cntTop = $(".scene.one").offset().top;
                cntEnd = $(".scene.two").offset().top;
                ToptoEnd = cntEnd-cntTop;
                if(scrollTop<cntTop+ToptoEnd*0.85){
                    $(".scene.one .subName").css({opacity:opacCal(scrollTop, cntTop, cntTop+ToptoEnd*0.1)});
                    $(".scene.one .name2").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.1, cntTop+ToptoEnd*0.2)});
                    for (var i=0; i< $(".scene.one .posPoint").children("div").last().index()+1; i++){  // 12개 이미지
                    $(".scene.one .posPoint").children("div").eq(i).css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*(0.3+0.045*i), cntTop+ToptoEnd*(0.3+0.045*(i+1)))});
                }
                }
                else {
                    $(".scene.one .subName").css({opacity:(1-opacCal(scrollTop, cntTop+(cntEnd-cntTop)*0.95, cntEnd))});
                    $(".scene.one .name2").css({opacity:(1-opacCal(scrollTop, cntTop+(cntEnd-cntTop)*0.95, cntEnd))});
                    $(".scene.one .posPoint").css({opacity:(1-opacCal(scrollTop, cntTop+(cntEnd-cntTop)*0.95, cntEnd))});
                }
            }
            else if ($(".scene.two").offset().top < scrollTop && scrollTop < $(".scene.three").offset().top){ // 두번째 콘텐츠 구간
                if (menuOp){    // 네비게이션 제거
                $(".header").fadeOut("slow");
                menuOp=false;
            }
                noneFixed($(".title .content"));
                noneFixed($(".scene.one .content"));
                noneFixed($(".scene.three .content"));
                noneFixed($(".scene.four .content"));
                fixed($(".scene.two .content"));
                cntTop = $(".scene.two").offset().top;
                cntEnd = $(".scene.three").offset().top;
                ToptoEnd = cntEnd-cntTop;
                $(".scene.two .subName").css({opacity:opacCal(scrollTop, cntTop, cntTop+ToptoEnd*0.1)});
                $(".scene.two .name2").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.1, cntTop+ToptoEnd*0.2)});
                for (var i=0; i<$(".scene.two .posPoint").children("div").last().index()+1; i++){
                    $(".scene.two .posPoint").children("div").eq(i).css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*(0.3+0.045*i), cntTop+ToptoEnd*(0.3+0.045*(i+1)))});
                }
                $(".scene.two").css({opacity:(1-opacCal(scrollTop, cntTop+(cntEnd-cntTop)*0.9, cntEnd))}); // fade OUT
            }
            else if ($(".scene.three").offset().top < scrollTop && scrollTop < $(".scene.four").offset().top){ //세번째
                if (menuOp){    // 네비게이션 제거
                $(".header").fadeOut("slow");
                menuOp=false;
                }
                noneFixed($(".title .content"));
                noneFixed($(".scene.one .content"));
                noneFixed($(".scene.two .content"));
                noneFixed($(".scene.four .content"));
                fixed($(".scene.three .content"));
                cntTop = $(".scene.three").offset().top;
                cntEnd = $(".scene.four").offset().top;
                ToptoEnd = cntEnd-cntTop;
                $(".scene.three .content").css({opacity:opacCal(scrollTop, cntTop, cntTop+ToptoEnd*0.2)});
                $(".scene.three .content h3").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.2, cntTop+ToptoEnd*0.3)});
                $(".scene.three .content .scrollImg").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.4, cntTop+ToptoEnd*0.6)});
            }
            else if ($(".scene.four").offset().top < scrollTop && scrollTop < $(".scene.five").offset().top){ // 네번째
                if (menuOp){    // 네비게이션 제거
                $(".header").fadeOut("slow");
                menuOp=false;
                }
                noneFixed($(".title .content"));
                noneFixed($(".scene.one .content"));
                noneFixed($(".scene.two .content"));
                noneFixed($(".scene.three .content"));
                fixed($(".scene.four .content"));
                cntTop = $(".scene.four").offset().top;
                cntEnd = $(".scene.five").offset().top;
                ToptoEnd = cntEnd-cntTop;
                $(".scene.four .content").css({opacity:opacCal(scrollTop, cntTop, cntTop+ToptoEnd*0.2)});
                $(".scene.four .content h3").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.2, cntTop+ToptoEnd*0.3)});
                $(".scene.four .content .scrollImg").css({opacity:opacCal(scrollTop, cntTop+ToptoEnd*0.4, cntTop+ToptoEnd*0.6)});
                $(".scene.four").css({opacity:(1-opacCal(scrollTop, cntTop+(cntEnd-cntTop)*0.8, cntEnd))});
            }
            else if ($(".scene.five").offset().top < scrollTop){ // 마지막
                if (menuOp){    // 네비게이션 제거
                $(".header").fadeOut("slow");
                menuOp=false;
                }
                noneFixed($(".title .content"));
                noneFixed($(".scene.one .content"));
                noneFixed($(".scene.two .content"));
                noneFixed($(".scene.three .content"));
                noneFixed($(".scene.four .content"));
                cntTop = $(".scene.five").offset().top;
                cntEnd = cntTop + $(".scene.five").height();
                ToptoEnd = cntEnd-cntTop;
            }
        })
    }
    var start = function(){     //초기 설정
        $(".title .name").fadeIn(3000);
        $(".title .sub").delay(1000).fadeIn(2000);
        $(".title .background").fadeIn(1000);
        slideImg($(".scene.three .slide img"));
        slideImg($(".scene.four .slide img"));
        $(".scene .posPoint div").height($(".scene .posPoint div").width());
        if($(window).width()<1025){ // 모바일
            $(".exImage img").width($(window).width()*0.8);
            $(".scene.five").height($(".content .box").height()+200);
        }
        else if($(window).width()>1025){ // PC
            $(".exImage img").width($(".content .box").width()*0.33);
            $(".scene.five").height($(".content .box").height()+1000);
        }
    }
    var opacCal = function(scrolltop, start, end){ //투명도 계산
        var value = (scrolltop - start) / (end - start);
        if (scrolltop < start)
            return 0;
        else if (value<=1){
            return value;
        }
        else if (scrolltop > end)
            return 1;
    }
    var noneFixed = function($content){
        $content.css({position: 'absolute', top:'0', left:'0', zIndex:'0'}); 
        $content.css({display:'none'});
    }
    var fixed = function($content){
        $content.css({position: 'fixed', top:'0', left:'0', zIndex:'1'});
        $content.fadeIn(0);
    }
    var slideImg = function($slideImg){ // 슬라이드 이미지 배치 함수
        if($(window).width()>1025){
            bannerLeft=0;
            for (var i=0; i<$slideImg.last().index(); i++){
                    $slideImg.eq(i).css({left: bannerLeft+(233+5)*i}); // 슬라이드 이미지 간격 5로 배치 $slideImg .slide img
                }
        }
        else{
            bannerLeft=212;
            for (var i=0; i<$slideImg.last().index(); i++){
                    $slideImg.eq(i).css({left: bannerLeft+(566+15)*i});
            }
        }
    }
    var moving = function(index){
        moveSec = $("body").children("section").eq(index);
        if (index==5){
            moveSecTop = moveSec.offset().top - 50;
        }
        else {
            moveSecTop = moveSec.offset().top;
        }
        $("html ,body").scrollTop(moveSecTop);
        setInterval(0, 100);
        if(index==0){
            $("html ,body").stop().animate({
            scrollTop: moveSecTop+$(".title").height()*0.3
        }, 1000, function(){
        });
        }
        else if (index==1 || index==2){
            $("html ,body").stop().animate({
            scrollTop: moveSecTop+$(".scene").height()*0.3
        }, 1000, function(){
        });
        }
        else if (index==3 || index==4){
            $("html ,body").stop().animate({
            scrollTop: moveSecTop+$(".scene").height()*0.7
        }, 1000, function(){
        });
        }
        else if (index==5){
            $("html ,body").stop().animate({
                scrollTop: moveSecTop+90
            }, 1000, function(){
            });
        }
    };
