$(".first-view").slick({
  autoplay: true, // 自動再生
  autoplaySpeed: 2500, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
  infinite: true, // 無限スライド
  centerMode: true,// 前後スライドを部分表示
  centerPadding: '15%',// 両端の見切れるスライド幅
  arrows:false,
});

$('.slide-fish').slick({
  autoplay: true, // 自動再生
  autoplaySpeed: 2500, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
  infinite: true, // 無限スライド

  centerMode: true,
  // centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        // centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        // centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
// よくある質問

$('.accordion-header').click(function() {
  $('.accordion-header').not(this).next().slideUp(); // clickされたaccordion-headerとは違う$('.accordion-header')の次にある要素をslideUpする
  $('.accordion-header').not(this).removeClass('active'); // clickされたaccordion-headerとは違う$('.accordion-header')からクラスactiveを外す
  $(this).next().slideToggle();
  $(this).toggleClass('active');
});



const animation = 'animate__fadeInUp';
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // entry.target.classList.remove(animation);
      entry.target.classList.add(animation);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection);
const animateClass = '.animate__animated';
const element = document.querySelector(animateClass);
observer.observe(element);

element.addEventListener('animationend', () => {
  element.classList.remove(animation);
});// });