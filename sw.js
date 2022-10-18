var cacheName = "aquastale";
var filesToCache = [
    "/",
    "assets/css/fontawesome-all.min.css",
    "assets/css/main.css",
    "assets/css/noscript.css",
    "assets/css/images/ie/banner-overlay.png",
    "assets/css/images/arrow.svg",
    "assets/css/images/overlay.png",
    "assets/js/breakpoints.min.js",
    "assets/js/browser.min.js",
    "assets/js/jquery.dropotron.min.js",
    "assets/js/jquery.min.js",
    "assets/js/jquery.scrollex.min.js",
    "assets/js/jquery.scrolly.min.js",
    "assets/js/main.js",
    "assets/js/util.js",
    "css/bootstrap.min.css",
    "css/bootstrap.min.css.map",
    "css/bootstrap-theme.min.css",
    "css/bootstrap-theme.min.css.map",
    "css/contact-style.css",
    "css/light-theme.min.css",
    "css/review-style.css",
    "css/service-style.css",
    "css/sortable.min.css",
    "css/style.css",
    "data/article.json",
    "data/comments.json",
    "fonts/glyphicons-halflings-regular.svg",
    "images/about1.png",
    "images/about2.png",
    "images/about3.png",
    "images/about4.png",
    "images/about5.png",
    "images/about6.png",
    "images/about7.png",
    "images/about8.png",
    "images/allBackground.png",
    "images/annie-spratt-BrfCiLC7Grc-unsplash.jpg",
    "images/annie-spratt-i5MW_nrHi1k-unsplash.jpg",
    "images/beatriz-perez-moya-M2T1j-6Fn8w-unsplash.jpg",
    "images/bin-thi-u-RjZQ3M3bGxQ-unsplash.jpg",
    "images/brooke-lark-tpCaZTXHfXM-unsplash.jpg",
    "images/comment-1.jpg",
    "images/comment-9.jpg",
    "images/disney-1.jpg",
    "images/evie-s-bSVGnUCk4tk-unsplash.jpg",
    "images/FacebookIcon.png",
    "images/foto-pettine-IfjHaIoAoqE-unsplash.jpg",
    "images/frame001.png",
    "images/frame002.png",
    "images/frame003.png",
    "images/frame004.png",
    "images/helloText.png",
    "images/home-001.jpg",
    "images/icon.png",
    "images/InstagramIcon.png",
    "images/jakob-owens-mLIurLmSRAY-unsplash.jpg",
    "images/jason-leung-nonlZlChSZQ-unsplash.jpg",
    "images/nathan-dumlao-5BB_atDT4oA-unsplash.jpg",
    "images/olivia-bauso-30UOqDM5QW0-unsplash.jpg",
    "images/ricardo-resende-62gBYKT7U5s-unsplash.jpg",
    "images/rricardo-resende-62gBYKT7U5s-unsplash.jpg",
    "images/theme-1.jpg",
    "images/theme-2.jpg",
    "images/theme-3.jpg",
    "images/theme-4.jpg",
    "images/tom-the-photographer-8yPA6ZYq0-s-unsplash.jpg",
    "images/TwitterIcon.png",
    "images/portfolio/11.jpg",
    "images/portfolio/22.jpg",
    "images/portfolio/111.jpg",
    "images/portfolio/333.jpg",
    "images/portfolio/444.jpg",
    "images/portfolio/555.jpg",
    "images/portfolio/666.jpg",
    "images/portfolio/777.jpg",
    "images/portfolio/888.jpg",
    "images/portfolio/999.jpg",
    "js/bootstrap.min.js",
    "js/growl-notification.min.js",
    "js/jquery.min.js",
    "js/npm.js",
    "js/scripts.js",
    "js/share.min.js",
    "js/sortable.min.js",
    "about.html",
    "contact.html",
    "index.html",
    "review.html",
    "service.html",
    "service-article.html"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});