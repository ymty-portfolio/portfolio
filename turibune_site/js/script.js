document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
     波と船アニメーション
  =============================== */

  const hunes = document.querySelectorAll(".hune");
  const namis = document.querySelectorAll(".nami");

  function float() {
    namis.forEach((nami) => {
      const svg = nami.closest("svg");
      if (!svg) return;

      const hune = svg.querySelector(".hune");
      if (!hune) return;

      const fixedLength = parseFloat(hune.dataset.length) || 0;
      const BASE_ROTATE = parseFloat(hune.dataset.rotate) || 0;
      const floatRate = parseFloat(hune.dataset.float) || 0.7;

      const p1 = nami.getPointAtLength(fixedLength);
      const p2 = nami.getPointAtLength(fixedLength + 1);

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      const box = hune.getBBox();
      const offsetX = box.width / 2;
      const offsetY = box.height * floatRate;

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + BASE_ROTATE;

      hune.style.transformOrigin = "center";
      hune.style.transformBox = "fill-box";

      hune.style.transform = `translate(${p1.x - offsetX}px, ${
        p1.y - offsetY
      }px)
         rotate(${angle}deg)`;
    });

    requestAnimationFrame(float);
  }

  if (namis.length) float();

  /* ===============================
     TOPボタン
  =============================== */

  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ===============================
     Slickスライダー
  =============================== */

  if (typeof $ !== "undefined" && $(".slide-image").length) {
    $(".slide-image").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 5000,
      pauseOnHover: false,
      dots: false,
      cssEase: "linear",
      arrows: false,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 800, settings: { slidesToShow: 3 } },
      ],
    });
  }

  /* ===============================
     チェックボックス必須
  =============================== */

  const form = document.querySelector(".form");
  const checkboxes = document.querySelectorAll('input[name="check[]"]');

  if (form && checkboxes.length) {
    form.addEventListener("submit", function (e) {
      document.documentElement.style.scrollBehavior = "auto";

      let isChecked = false;

      checkboxes.forEach(function (box) {
        if (box.checked) isChecked = true;
      });

      if (!isChecked) {
        e.preventDefault();
        alert("お問い合わせ内容を1つ以上選択してください。");
        checkboxes[0].focus();
      }
    });
  }

  /* ===============================
     今日の日付自動入力
  =============================== */

  const dateInput = document.getElementById("todaydate");

  if (dateInput) {
    const now = new Date();
    const y = now.getFullYear();
    const m = ("0" + (now.getMonth() + 1)).slice(-2);
    const d = ("0" + now.getDate()).slice(-2);

    const today = `${y}-${m}-${d}`;

    dateInput.value = today;
    dateInput.min = today;
  }

  // ハンバーガーメニュー
  const ham = document.getElementById("hamburger");
  const nav = document.querySelector(".hn");

  ham.addEventListener("click", function () {
    ham.classList.toggle("is-show");
    nav.classList.toggle("is-show");
  });

  // 背景の魚
  const fishContainer = document.querySelector(".fish-bg");

  // 魚画像
  const fishImages = [
    { src: "img/fish1.png", weight: 5 },
    { src: "img/fish2.png", weight: 20 },
    { src: "img/fish3.png", weight: 60 },
    { src: "img/fish4.png", weight: 20 },
    { src: "img/fish5.png", weight: 20 },
  ];

  function getRandomFish() {
    const totalWeight = fishImages.reduce((sum, fish) => sum + fish.weight, 0);
    let random = Math.random() * totalWeight;

    for (let fish of fishImages) {
      if (random < fish.weight) {
        return fish.src;
      }
      random -= fish.weight;
    }

    // 保険
    return fishImages[0].src;
  }

  function createFish() {
    if (!fishContainer) return;

    const fish = document.createElement("img");
    fish.src = getRandomFish();
    fish.classList.add("fish");

    const startTop = Math.random() * (window.innerHeight - 100);
    const duration = 15 + Math.random() * 10;
    const direction = Math.random() > 0.5 ? "right" : "left";

    fish.style.top = startTop + "px";
    fishContainer.appendChild(fish);

    let keyframes;

    if (direction === "right") {
      keyframes = [
        { transform: "translateX(-150px) scaleX(-1)" },
        { transform: "translateX(110vw) scaleX(-1)" },
      ];
    } else {
      keyframes = [
        { transform: "translateX(110vw) scaleX(1)" },
        { transform: "translateX(-150px) scaleX(1)" },
      ];
    }

    const animation = fish.animate(keyframes, {
      duration: duration * 1000,
      iterations: 1,
      easing: "linear",
    });

    animation.onfinish = () => {
      fish.remove();
    };
  }

  // 3秒ごとに出現
  setInterval(createFish, 3000);

  // カーソル
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.createElement("img");
    cursor.src = "img/cursor_fish.png";
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    // 通常カーソルを消す
    document.body.style.cursor = "none";

    // 追従
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // ===== hover切替 =====
    const hoverTargets = document.querySelectorAll(
      "a, button, input[type='submit'], input[type='checkbox'], select, input[type='date']"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.src = "img/cursor_fishhv.png";
      });

      el.addEventListener("mouseleave", () => {
        cursor.src = "img/cursor_fish.png";
      });
    });
  }
});
