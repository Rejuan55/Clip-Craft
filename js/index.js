/* Videos - Connect with CMS Video Link */
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document)
    .find("[data-cms-src]")
    .map((index, el) => {
      const src = $(el).attr("data-cms-src");
      const thumbnail = $(el).attr("data-cms-thumbnail");
      const slug = $(el).attr("data-cms-slug");
      const slugMobile = $(el).attr("data-cms-slug-mobile");

      const videoEl = $(el).find("video");
      const videoControlEl = $(el).find(
        "[data-w-bg-video-control][aria-controls]"
      );

      if (!!thumbnail) videoEl.attr("poster", thumbnail);

      if (slug) {
        videoEl.prop("muted", false);
        videoEl.attr("id", `video-${slug}-${index}`);
        videoControlEl.attr("aria-controls", `video-${slug}-${index}`);
      }

      if (slugMobile) {
        videoEl.prop("muted", false);
        videoEl.attr("id", `video-mobile-${slugMobile}-${index}`);
        videoControlEl.attr(
          "aria-controls",
          `video-mobile-${slugMobile}-${index}`
        );
      }

      videoEl.html(
        `<source src="${src}${!thumbnail ? "#t=1" : ""}" type="video/mp4">`
      );
    });
});

window.addEventListener("scroll", function () {
  const image = document.getElementById("rotating-image");
  const scrollY = window.scrollY;

  // Adjust the rotation angle based on scroll position
  const rotationAngle = scrollY * 0.1; // You can adjust the speed of rotation here

  // Apply CSS transformation to rotate the image
  image.style.transform = `rotate(${rotationAngle}deg)`;
});

/* Videos - Reset current time on first play */
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document)
    .find("video")
    .map((index, el) => {
      let playCount = 0;

      $(el).on("play", function () {
        if (playCount == 0) {
          el.currentTime = 0;
        }

        playCount += 1;
      });
    });
});

/* Case Studies Swiper Carousel */
var Webflow = Webflow || [];
Webflow.push(function () {
  const caseStudiesSwiper = new Swiper(".swiper-case-studies", {
    init: false,
    autoHeight: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    pagination: false,
    autoplay: false,
    navigation: {
      nextEl: ".home-case-studies-nav .swiper-button-next",
      prevEl: ".home-case-studies-nav .swiper-button-prev",
    },
  });

  caseStudiesSwiper.on("init", function () {
    const totalSlide = caseStudiesSwiper.slides.length;

    $(".home-case-studies-nav .swiper-nav-number_total").text(
      ("0" + totalSlide).slice(-2)
    );
  });

  caseStudiesSwiper.on("slideChange", function () {
    const currentSlide = caseStudiesSwiper.realIndex + 1;

    $(".home-case-studies-nav .swiper-nav-number_active").text(
      ("0" + currentSlide).slice(-2)
    );
  });

  caseStudiesSwiper.init();
});

// <![CDATA[  <-- For SVG support
if ("WebSocket" in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (
          (elem.href && typeof rel != "string") ||
          rel.length == 0 ||
          rel.toLowerCase() == "stylesheet"
        ) {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
          elem.href =
            url +
            (url.indexOf("?") >= 0 ? "&" : "?") +
            "_cacheOverride=" +
            new Date().valueOf();
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
    var address =
      protocol + window.location.host + window.location.pathname + "/ws";
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == "reload") window.location.reload();
      else if (msg.data == "refreshcss") refreshCSS();
    };
    if (
      sessionStorage &&
      !sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")
    ) {
      console.log("Live reload enabled.");
      sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", true);
    }
  })();
} else {
  console.error(
    "Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading."
  );
}
// ]]>

/* Hero Title Icon Hover Animation */
var Webflow = Webflow || [];
Webflow.push(function () {
  $(".home-hero_title-icon").on("animationend", function () {
    $(this).removeClass("animate");
  });

  $(".home-hero_title-icon").hover(
    function () {
      if (!$(this).hasClass("animate")) $(this).addClass("animate");
    },
    function () {}
  );
});

/* Video Popup Custom */
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document).on("click", "[data-video-popup]", function () {
    const src = $(this).attr("data-video-popup");
    const thumbnail = $(this).attr("data-video-thumbnail");
    const videoEl = $(document).find(".video-popup_video video");
    const videoPopup = $(document).find(".video-popup");

    if (!videoEl || !videoPopup) return;

    if (!!thumbnail) videoEl.attr("poster", thumbnail);

    videoEl.prop("muted", false);
    videoEl.html(
      `<source src="${src}${!thumbnail ? "#t=1" : ""}" type="video/mp4">`
    );
    videoEl.get(0).load();

    videoPopup.fadeIn();
  });

  $(document).on("click", ".video-popup_close", function () {
    const videoEl = $(document).find(".video-popup_video video");
    const videoPauseButton = $(document).find(
      ".video-popup_video .video-button-icon.pause-button"
    );
    const videoPopup = $(document).find(".video-popup");

    if (!videoEl || !videoPopup) return;

    if (!videoPauseButton.attr("hidden"))
      videoPauseButton.closest("[aria-controls]").click();

    videoPopup.fadeOut();
  });
});

/* Hero Video */
var Webflow = Webflow || [];
Webflow.push(function () {
  const HERO_VIDEO_URL_TAB_1 =
    "https://d14847w1v6j0h7.cloudfront.net/vsl+(1).mp4";
  const HERO_VIDEO_URL_TAB_2 =
    "https://cdn.vidzflow.com/v/D7TgnQ36GT_1080p_1705435566.mp4";
  const HERO_VIDEO_URL_TAB_3 =
    "https://cdn.vidzflow.com/v/yLVa2SAhCX_1080p_1704941360.mp4";

  $(document)
    .find("#hero-video-tab-1 video")
    .prop("muted", false)
    .html(`<source src="${HERO_VIDEO_URL_TAB_1}#t=4" type="video/mp4">`);
  $(document)
    .find("#hero-video-tab-2 video")
    .prop("muted", false)
    .html(`<source src="${HERO_VIDEO_URL_TAB_2}#t=4" type="video/mp4">`);
  $(document)
    .find("#hero-video-tab-3 video")
    .prop("muted", false)
    .html(`<source src="${HERO_VIDEO_URL_TAB_3}#t=4" type="video/mp4">`);
});
