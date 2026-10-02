document.getElementById("yr").textContent = new Date().getFullYear();

// FAQ accordion
document.querySelectorAll(".faq button").forEach(function (b) {
  b.addEventListener("click", function () {
    var open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!open));
    document.getElementById(b.getAttribute("aria-controls")).classList.toggle("on", !open);
  });
});

// header hides on scroll down, shows on scroll up
(function () {
  var h = document.getElementById("hdr"), last = 0;
  addEventListener("scroll", function () {
    var y = scrollY;
    h.classList.toggle("hide", y > last && y > 120);
    last = y;
  }, { passive: true });
})();
