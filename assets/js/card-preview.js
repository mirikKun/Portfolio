// Home page: on hover or keyboard focus, a project card with data-preview plays that GIF over its still image.
// The GIF loads on first hover only, so the page doesn't download several MB of GIFs up front.
(function () {
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  document.querySelectorAll(".card-thumb[data-preview]").forEach(function (thumb) {
    var card = thumb.closest(".card");
    var preview = null;
    var active = false;

    function start() {
      active = true;
      if (!preview) {
        preview = new Image();
        preview.className = "card-preview";
        preview.alt = "";
        preview.decoding = "async";
        preview.onload = function () {
          if (preview.naturalHeight > preview.naturalWidth) preview.classList.add("portrait");
          thumb.classList.add("is-ready");
          if (active) thumb.classList.add("is-playing");
        };
        preview.src = thumb.dataset.preview;
        thumb.appendChild(preview);
        thumb.classList.add("is-loading");
      } else if (thumb.classList.contains("is-ready")) {
        thumb.classList.add("is-playing");
      }
    }

    function stop() {
      active = false;
      thumb.classList.remove("is-playing");
    }

    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("focus", start);
    card.addEventListener("blur", stop);
  });
})();
