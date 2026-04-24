$(function () {

    // フッターと被ったらトップのボタンが消える
    $(window).scroll(function () {

        if (window.matchMedia("(max-width: 1200px)").matches) {
            $(".up-btn").hide();
            $(".top-btn").show();
            return;
        }
    
        let scT = $(window).scrollTop();
        let footer = $("footer").offset().top;
        let winH = $(window).height();
    
        if (scT >= (footer - (winH - 200))) {
            $(".top-btn").css("display", "none");
            $(".up-btn").css("display", "block");
        } else {
            $(".top-btn").css("display", "block");
            $(".up-btn").css("display", "none");
        }
    
    });
    // スクロールフワ
    $(window).scroll(function () {
        let scT = $(window).scrollTop();
        $(".fuwa").each(function () {
            if (scT > $(this).offset().top-$(window).height()) {
                $(this).addClass("on");
            } else {
                $(this).removeClass("on");
            };
        });
    });

    //    ハンバーガーメニュー
    $(".hum-menu").click(function () {
        $(this).toggleClass("on");
        $("nav").toggleClass("on");
    });
    
    // スライダー
            $('.slick').slick({
                autoplay:true,
                autoplaySpeed:5000,
                speed:2000,
                slidesToShow:4,
                arrows:false,
                responsive:[
                    {
                        breakpoint:1000,
                        settings:{slidesToShow:3}
                    },
                    {
                        breakpoint:700,
                        settings:{slidesToShow:2}
                    },
                    {
                        breakpoint:500,
                        settings:{slidesToShow:1}
                    }
                ]
            });
    $('.form-slide').slick({
        autoplay: true,
        autoplaySpeed:4000,
        speed:1500,
    });

    // レスポンシブ
    $(window).scroll(function(){

        let fv = $(".top-img").height();
        let sc = $(window).scrollTop();
        
        if(sc > fv){
        $(".header").addClass("scrolled");
        }else{
        $(".header").removeClass("scrolled");
        }
        
        });
});