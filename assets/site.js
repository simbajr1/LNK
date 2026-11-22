const d = document,
  b = d.body,
  $ = (s, r = d) => [...r.querySelectorAll(s)],
  ready = () => b.classList.add("ready");
const year = d.querySelector("footer .sm");
if (year) year.textContent = year.textContent.replace(/\d{4}/, String(new Date().getFullYear()));
const hero = d.querySelector(".hero");
let seen = 0;
try {
  seen = sessionStorage.getItem("p");
} catch (e) {}
if (hero && !seen) {
  const p = d.createElement("div");
  p.id = "pre";
  p.innerHTML = '<div><svg class="ic"><use href="#drop"/></svg><b>0%</b></div>';
  b.append(p);
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(100, n + 1 + Math.floor(Math.random() * 8));
    p.querySelector("b").textContent = n + "%";
    if (n >= 100) {
      clearInterval(t);
      setTimeout(() => {
        p.classList.add("done");
        ready();
        setTimeout(() => p.remove(), 1100);
        try {
          sessionStorage.setItem("p", 1);
        } catch (e) {}
      }, 250);
    }
  }, 45);
} else ready();
const h = d.querySelector("header"),
  sc = () => h.classList.toggle("sc", scrollY > 40 || !hero);
sc();
addEventListener("scroll", sc, { passive: true });
const mb = d.querySelector(".mb");
mb.onclick = () => mb.setAttribute("aria-expanded", b.classList.toggle("open"));
$("#menu a").forEach((a) =>
  a.addEventListener("click", () => {
    b.classList.remove("open");
    mb.setAttribute("aria-expanded", "false");
  }),
);
d.addEventListener("click", (e) => {
  if (b.classList.contains("open") && !e.target.closest("header")) {
    b.classList.remove("open");
    mb.setAttribute("aria-expanded", "false");
  }
});
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$("[data-r]").forEach((e) => io.observe(e));

if (d.querySelector(".phd-dark")) {
  const makeVideoCard = (poster, src, title, description) => {
    const card = d.createElement("article");
    card.className = "cd";
    card.innerHTML =
      '<div class="cm"><svg class="phs" viewBox="0 0 64 48" aria-hidden="true"><use href="#ph-play"/></svg><video controls playsinline preload="none" poster="' +
      poster +
      '"><source src="' +
      src +
      '" type="video/mp4"></video></div><div class="ct"><h4>' +
      title +
      "</h4><p>" +
      description +
      "</p></div>";
    return card;
  };

  $(".event").forEach((event) => {
    const heading = event.querySelector(".eh h3");
    const track = event.querySelector(".tr");
    if (!heading || !track) return;
    if (heading.textContent.includes("AFRETEC")) {
      if (!track.querySelector('source[src="assets/video/PhD proposal presentation.mp4"]')) {
        track.prepend(
          makeVideoCard(
            "assets/img/afretec-2.jpg",
            "assets/video/PhD proposal presentation.mp4",
            "PhD proposal presentation",
            "Presenting the PhD proposal and outlining the research approach for integrating wastewater as an alternative water source in Lagos and Nairobi.",
          ),
        );
      }
    }
    if (heading.textContent.includes("Liverpool")) {
      if (!track.querySelector('source[src="assets/video/Liverpool conference.mp4"]')) {
        track.prepend(
          makeVideoCard(
            "assets/img/liverpool-1.jpg",
            "assets/video/Liverpool conference.mp4",
            "Liverpool conference",
            "A video highlight from the Liverpool Early Career Researchers Conference 2026, featuring the presentation and discussion on urban water systems and coastal urbanism.",
          ),
        );
      }
    }
  });

  const paperTitle = $(".ct h4").find((h) => h.textContent.trim() === "Paper title");
  if (paperTitle) {
    paperTitle.nextElementSibling.textContent =
      "“Towards Circular Urban Water Systems: A Comparative SEEIT Assessment of Wastewater Reuse Barriers in Lagos and Nairobi.”";
  }
}
const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
$(".cr").forEach((c) => {
  const tr = c.querySelector(".tr"),
    vp = c.querySelector(".cv"),
    orig = [...tr.children];
  let lastW = 0;
  const build = () => {
    $(".cl", tr).forEach((x) => x.remove());
    if (rm) return;
    const last = orig[orig.length - 1],
      mr = parseFloat(getComputedStyle(last).marginRight) || 0,
      w = last.offsetLeft + last.offsetWidth + mr - orig[0].offsetLeft;
    if (!w) return;
    for (let i = 0, k = Math.ceil(vp.clientWidth / w) + 1; i < k; i++)
      orig.forEach((o) => {
        const x = o.cloneNode(true);
        x.classList.add("cl");
        x.setAttribute("aria-hidden", "true");
        $("video", x).forEach((v) => (v.tabIndex = -1));
        tr.append(x);
      });
    tr.style.setProperty("--w", w + "px");
    tr.style.setProperty("--d", w / 38 + "s");
  };
  build();
  let t;
  addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (vp.clientWidth !== lastW) {
        lastW = vp.clientWidth;
        build();
      }
    }, 200);
  });
  lastW = vp.clientWidth;
  addEventListener("load", build);
  const tg = c.parentElement.querySelector(".tg");
  tg.onclick = () => tg.setAttribute("aria-pressed", c.classList.toggle("pause"));
  c.addEventListener("play", () => c.classList.add("vp"), true);
  ["pause", "ended"].forEach((ev) => c.addEventListener(ev, () => c.classList.remove("vp"), true));
});
const lb = d.createElement("div");
lb.id = "lb";
lb.innerHTML = '<img alt="">';
b.append(lb);
d.addEventListener("click", (e) => {
  const i = e.target.closest(".cm img");
  if (i) {
    lb.querySelector("img").src = i.src;
    lb.classList.add("on");
  } else if (e.target.closest("#lb")) lb.classList.remove("on");
});
d.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lb.classList.remove("on");
    b.classList.remove("open");
    mb.setAttribute("aria-expanded", "false");
  }
});
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  const k = d.createElement("div");
  k.id = "cur";
  b.append(k);
  let x = 0,
    y = 0,
    cx = 0,
    cy = 0;
  addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
  });
  (function t() {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    k.style.transform = "translate(" + cx + "px," + cy + "px)";
    requestAnimationFrame(t);
  })();
  d.addEventListener("mouseover", (e) => {
    const t = e.target.closest("[data-cur],.cm img");
    k.textContent = t ? t.dataset.cur || "View" : "";
    k.classList.toggle("on", !!t);
  });
}
