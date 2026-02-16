

// ===== HERO SLIDER DATA =====
const slides = [
    {
      image: "img/bbq.webp",
      kicker: "ВЕЧЕРИ НА ЖАР И ПОД ЗВЕЗДИТЕ",
      title: "BBQ\nМОМЕНТИ",
      line1: "Голяма маса, огън и аромат на гора",
      line2: "за компании, които обичат истинските вечери",
      statValue: "1",
      statUnit: "ЗОНА",
      statLabel: "BBQ С ПОКРИВ",
      primary: { text: "Виж BBQ зоната", href: "#bbq" },
      secondary: { text: "Запази уикенд", href: "#booking" },
    },
    {
      image: "img/basein.webp",
      kicker: "ЛЯТО В ЛАТЕ ЦВЕТОВЕ",
      title: "БАСЕЙН\nИ ТИШИНА",
      line1: "Сутрешно кафе и вода, която успокоява",
      line2: "следобед — слънце, вечер — прохлада",
      statValue: "28",
      statUnit: "°C",
      statLabel: "ЛЯТНО УСЕЩАНЕ",
      primary: { text: "Разгледай басейна", href: "#pool" },
      secondary: { text: "Галерия", href: "#gallery" },
    },
    {
      image: "img/batunski-manastir.webp",
      kicker: "НА КРАЧКА ОТ ПРИРОДАТА",
      title: "МЯСТО\nЗА РАЗХОДКИ",
      line1: "Пътеки, въздух и любими гледки",
      line2: "открий близките маршрути и забележителности",
      statValue: "15",
      statUnit: "МИН",
      statLabel: "ДО СПОКОЙНА ПЪТЕКА",
      primary: { text: "Виж маршрути", href: "#trips" },
      secondary: { text: "Локация", href: "#location" },
    },
  ];
  
  // ===== ELEMENTS =====
  const header = document.getElementById("siteHeader");
  
  const sliderEl = document.getElementById("heroSlider");
  const kickerEl = document.getElementById("heroKicker");
  const titleEl = document.getElementById("heroTitle");
  const line1El = document.getElementById("heroLine1");
  const line2El = document.getElementById("heroLine2");
  
  const primaryCta = document.getElementById("primaryCta");
  const secondaryCta = document.getElementById("secondaryCta");
  
  const statValueEl = document.getElementById("statValue");
  const statUnitEl = document.getElementById("statUnit");
  const statLabelEl = document.getElementById("statLabel");
  
  const counterEl = document.getElementById("progressCounter");
  const barsEl = document.getElementById("progressBars");
  
  const prevBtn = sliderEl.querySelector("[data-prev]");
  const nextBtn = sliderEl.querySelector("[data-next]");
  
  // Dropdowns (multiple)
  const dropdowns = [...document.querySelectorAll("[data-dropdown]")];
  
  // ===== OFFCANVAS MENU =====
  const burgerBtn = document.getElementById("burgerBtn");
  const offcanvas = document.getElementById("offcanvas");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  
  // ===== STATE =====
  let index = 0;
  let timerId = null;
  let revealTimers = [];
  
  const AUTOPLAY_MS = 6500;
  
  // slower stagger timing
  const STAGGER_TITLE_MS = 40;
  const STAGGER_L1_MS = 220;
  const STAGGER_L2_MS = 420;
  
  // ===== HELPERS =====
  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  
  function setMultilineTitle(text) {
    titleEl.innerHTML = (text || "").replaceAll("\n", "<br/>");
  }
  
  function setActiveBars(i) {
    if (!barsEl) return;
    const bars = [...barsEl.querySelectorAll(".bar")];
    bars.forEach((b, idx) => b.classList.toggle("is-active", idx === i));
  }
  
  function applyRevealClasses() {
    kickerEl.classList.add("reveal");
    titleEl.classList.add("reveal");
    line1El.classList.add("reveal");
    line2El.classList.add("reveal");
  }
  
  function fastStaggerIn() {
    revealTimers.forEach(t => clearTimeout(t));
    revealTimers = [];
  
    [kickerEl, titleEl, line1El, line2El].forEach(el => el.classList.remove("is-in"));
    void titleEl.offsetWidth; // force reflow (важно)
  
    revealTimers.push(setTimeout(() => kickerEl.classList.add("is-in"), 0));
    revealTimers.push(setTimeout(() => titleEl.classList.add("is-in"), STAGGER_TITLE_MS));
    revealTimers.push(setTimeout(() => line1El.classList.add("is-in"), STAGGER_L1_MS));
    revealTimers.push(setTimeout(() => line2El.classList.add("is-in"), STAGGER_L2_MS));
  }
  
  function renderSlide(i) {
    const s = slides[i];
  
    sliderEl.style.backgroundImage = `url("${s.image}")`;
    // reset zoom
sliderEl.style.transition = "none";
sliderEl.style.setProperty("--bgZoom", "108%");

// force reflow (много важно)
void sliderEl.offsetWidth;

// activate animation
sliderEl.style.transition = "background-size 6.6s ease";
sliderEl.style.setProperty("--bgZoom", "118%");

  
    const kickerText = kickerEl.querySelector(".k-text");
    if (kickerText) kickerText.textContent = s.kicker || "";
  
    setMultilineTitle(s.title || "");
    line1El.textContent = s.line1 || "";
    line2El.textContent = s.line2 || "";
  
    statValueEl.textContent = s.statValue ?? "";
    statUnitEl.textContent = s.statUnit || "";
    statLabelEl.textContent = s.statLabel || "";
  
    if (primaryCta && s.primary) {
      primaryCta.innerHTML = "";
      primaryCta.textContent = s.primary.text;
      primaryCta.href = s.primary.href;
      primaryCta.insertAdjacentHTML("beforeend", ' <span class="btn-ic">▶</span>');
    }
    if (secondaryCta && s.secondary) {
      secondaryCta.textContent = s.secondary.text;
      secondaryCta.href = s.secondary.href;
    }
  
    counterEl.textContent = `${pad2(i + 1)}/${pad2(slides.length)}`;
    setActiveBars(i);
  
    fastStaggerIn();
  }
  
  function go(dir) {
    index = (index + dir + slides.length) % slides.length;
    renderSlide(index);
    restartAutoplay();
  }
  
  function restartAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => go(1), AUTOPLAY_MS);
  }
  
  function stopAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  
  // ===== DROPDOWNS (desktop) =====
  function closeAllDropdowns(except = null) {
    dropdowns.forEach(dd => {
      if (dd === except) return;
      dd.classList.remove("is-open");
      const btn = dd.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }
  dropdowns.forEach(dd => {
    const btn = dd.querySelector("button");
    if (!btn) return;
  
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains("is-open");
      closeAllDropdowns(dd);
      dd.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });
  document.addEventListener("click", () => closeAllDropdowns(null));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns(null);
  });
  
  // ===== OFFCANVAS OPEN/CLOSE =====
  function openMenu() {
    document.body.classList.add("menu-open");
    burgerBtn.setAttribute("aria-expanded", "true");
    offcanvas.setAttribute("aria-hidden", "false");
    menuOverlay.hidden = false;
  
    // focus close button for accessibility
    setTimeout(() => closeMenuBtn.focus(), 50);
  }
  
  function closeMenu() {
    document.body.classList.remove("menu-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    offcanvas.setAttribute("aria-hidden", "true");
  
    // wait a bit so fade-out looks nice
    setTimeout(() => {
      if (!document.body.classList.contains("menu-open")) menuOverlay.hidden = true;
    }, 280);
  
    burgerBtn.focus();
  }
  
  burgerBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  });
  
  closeMenuBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
  
  // close menu when clicking a link inside it
  offcanvas.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    closeMenu();
  });
  
  // ===== SLIDER EVENTS =====
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
  
  // Header solid on scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-solid", window.scrollY > 10);
  });
  
  // Pause autoplay on hover
  sliderEl.addEventListener("mouseenter", stopAutoplay);
  sliderEl.addEventListener("mouseleave", restartAutoplay);
  
  // Pause autoplay when tab not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else restartAutoplay();
  });
  
  // ===== Touch swipe =====
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  
  sliderEl.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    isSwiping = true;
    stopAutoplay();
  }, { passive: true });
  
  sliderEl.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchStartX);
    const dy = Math.abs(t.clientY - touchStartY);
    if (dy > dx && dy > 12) isSwiping = false;
  }, { passive: true });
  
  sliderEl.addEventListener("touchend", (e) => {
    if (!isSwiping) {
      restartAutoplay();
      return;
    }
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
  
    const SWIPE_THRESHOLD = 40;
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  
    isSwiping = false;
    restartAutoplay();
  }, { passive: true });
  
  // ===== INIT =====
  applyRevealClasses();
  renderSlide(index);
  restartAutoplay();

  
  

  // ===== LOADER (hide on full load) =====
window.addEventListener("load", () => {
  const loader = document.getElementById("vvLoader");
  if (!loader) return;

  // по желание: да се вижда минимум 900ms (за да не "мигне")
  const MIN_MS = 900;
  const started = performance.now();

  const hide = () => {
    loader.classList.add("is-hidden");
    // чистим от DOM след fade
    setTimeout(() => loader.remove(), 450);
  };

  const elapsed = performance.now() - started;
  if (elapsed >= MIN_MS) hide();
  else setTimeout(hide, MIN_MS - elapsed);
});





function setVH() {
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
}

setVH();

window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setVH);
  window.visualViewport.addEventListener("scroll", setVH);
}


// ================================
// STAY SHOW (Accommodation slider) + open from menu
// ================================
(() => {
  const show = document.getElementById("stayShow");
  const track = document.getElementById("stayTrack");
  if (!show || !track) return;

  const slides = [...track.querySelectorAll(".stay-slide")];
  const tabs = [...show.querySelectorAll("[data-stay-tab]")];
  const dots = [...show.querySelectorAll("[data-stay-dot]")];
  const prev = show.querySelector("[data-stay-prev]");
  const next = show.querySelector("[data-stay-next]");

  let i = 0;
  let t = null;
  let resumeTimeout = null;

  const AUTOPLAY = 5200;
  const PAUSE_AFTER_MANUAL_MS = 12000; // 12s пауза след клик от меню/tab

  function setActive(idx) {
    i = (idx + slides.length) % slides.length;

    // move track
    track.style.transform = `translateX(-${i * 100}%)`;

    // states
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    tabs.forEach((b, k) => {
      b.classList.toggle("is-active", k === i);
      b.setAttribute("aria-selected", String(k === i));
    });
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  }

  function stop() {
    if (t) clearInterval(t);
    t = null;
  }

  function restart() {
    stop();
    t = setInterval(() => setActive(i + 1), AUTOPLAY);
  }

  function pauseThenResume() {
    stop();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      // връщаме autoplay само ако секцията е видима
      if (isVisible) restart();
    }, PAUSE_AFTER_MANUAL_MS);
  }

  function go(dir) {
    setActive(i + dir);
    pauseThenResume();
  }

  // events
  prev?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.stayTab || 0));
      pauseThenResume();
    });
  });

  dots.forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.stayDot || 0));
      pauseThenResume();
    });
  });

  // pause on hover / touch
  show.addEventListener("mouseenter", stop);
  show.addEventListener("mouseleave", () => { if (isVisible) restart(); });

  show.addEventListener("touchstart", stop, { passive: true });
  show.addEventListener("touchend", () => { if (isVisible) restart(); }, { passive: true });

  // start autoplay only when section is visible
  let isVisible = false;
  const io = new IntersectionObserver((entries) => {
    isVisible = entries.some(e => e.isIntersecting);
    if (isVisible) restart();
    else stop();
  }, { threshold: 0.25 });

  io.observe(show);

  // ==========================================
  // OPEN SPECIFIC SLIDE FROM MENU LINKS
  // Any link/button with data-stay-go="0..3" and href="#stay"
  // ==========================================
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-stay-go]");
    if (!el) return;

    const href = el.getAttribute("href");
    // работи и ако е button без href (не е проблем)
    if (href && href !== "#stay") return;

    const targetIdx = Number(el.dataset.stayGo || 0);

    // Ако е линк към #stay, остави да скролне, после отвори таба
    // (в webview е най-стабилно)
    setTimeout(() => {
      setActive(targetIdx);
      pauseThenResume();
    }, 250);
  });

  // init
  setActive(0);
})();


// ================================
// STAY SHOW (Accommodation slider) + open from menu + SWIPE
// ================================
(() => {
  const show = document.getElementById("stayShow");
  const track = document.getElementById("stayTrack");
  if (!show || !track) return;

  const slides = [...track.querySelectorAll(".stay-slide")];
  const tabs = [...show.querySelectorAll("[data-stay-tab]")];
  const dots = [...show.querySelectorAll("[data-stay-dot]")];
  const prev = show.querySelector("[data-stay-prev]");
  const next = show.querySelector("[data-stay-next]");

  let i = 0;
  let t = null;
  let resumeTimeout = null;

  const AUTOPLAY = 5200;
  const PAUSE_AFTER_MANUAL_MS = 12000;

  function setActive(idx) {
    i = (idx + slides.length) % slides.length;

    track.style.transform = `translateX(-${i * 100}%)`;

    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    tabs.forEach((b, k) => {
      b.classList.toggle("is-active", k === i);
      b.setAttribute("aria-selected", String(k === i));
    });
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  }

  function stop() {
    if (t) clearInterval(t);
    t = null;
  }

  function restart() {
    stop();
    t = setInterval(() => setActive(i + 1), AUTOPLAY);
  }

  let isVisible = false;

  function pauseThenResume() {
    stop();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      if (isVisible) restart();
    }, PAUSE_AFTER_MANUAL_MS);
  }

  function go(dir) {
    setActive(i + dir);
    pauseThenResume();
  }

  // Buttons
  prev?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.stayTab || 0));
      pauseThenResume();
    });
  });

  dots.forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.stayDot || 0));
      pauseThenResume();
    });
  });

  // Autoplay only when visible
  const io = new IntersectionObserver((entries) => {
    isVisible = entries.some(e => e.isIntersecting);
    if (isVisible) restart();
    else stop();
  }, { threshold: 0.25 });

  io.observe(show);

  // Hover pause (desktop)
  show.addEventListener("mouseenter", stop);
  show.addEventListener("mouseleave", () => { if (isVisible) restart(); });

  // ==========================================
  // OPEN SPECIFIC SLIDE FROM MENU LINKS
  // href="#stay" + data-stay-go="0..3"
  // ==========================================
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-stay-go]");
    if (!el) return;

    const href = el.getAttribute("href");
    if (href && href !== "#stay") return;

    const targetIdx = Number(el.dataset.stayGo || 0);

    // след скрола (по-стабилно в webview)
    setTimeout(() => {
      setActive(targetIdx);
      pauseThenResume();
    }, 250);
  });

  // ==========================================
  // SWIPE (touch) + DRAG (mouse) — most compatible
  // ==========================================
  const viewport = show.querySelector(".stay-viewport") || show;

  let sx = 0, sy = 0, lx = 0;
  let dragging = false;
  let locked = null; // "x" | "y" | null

  const THRESHOLD = 50; // px за смяна
  const LOCK_DIST = 10; // px за lock

  function startGesture(x, y) {
    dragging = true;
    locked = null;
    sx = x; sy = y; lx = x;
    stop(); // спираме autoplay докато дърпаме
  }

  function moveGesture(x, y, ev) {
    if (!dragging) return;
    const dx = x - sx;
    const dy = y - sy;

    if (!locked) {
      if (Math.abs(dx) > LOCK_DIST) locked = "x";
      else if (Math.abs(dy) > LOCK_DIST) locked = "y";
    }

    if (locked === "x") {
      // ако е хоризонтално, спираме page scroll-а
      if (ev && ev.cancelable) ev.preventDefault();
      lx = x;
    }
    // ако е "y" – оставяме вертикален scroll (нищо не правим)
  }

  function endGesture() {
    if (!dragging) return;
    dragging = false;

    if (locked !== "x") {
      if (isVisible) restart();
      return;
    }

    const diff = lx - sx;

    if (diff > THRESHOLD) go(-1);
    else if (diff < -THRESHOLD) go(1);
    else if (isVisible) restart();
  }

  // Touch
  viewport.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    startGesture(t.clientX, t.clientY);
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    moveGesture(t.clientX, t.clientY, e);
  }, { passive: false });

  viewport.addEventListener("touchend", endGesture, { passive: true });
  viewport.addEventListener("touchcancel", endGesture, { passive: true });

  // Mouse drag (desktop)
  viewport.addEventListener("mousedown", (e) => {
    // ако кликаш върху бутон/линк – не стартираме drag
    if (e.target.closest("button, a")) return;
    startGesture(e.clientX, e.clientY);

    const onMove = (ev) => moveGesture(ev.clientX, ev.clientY, null);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      endGesture();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  });

  // init
  setActive(0);
})();



// ================================
// EXPERIENCES: cinematic grid -> detail panels + hash support
// ================================
(() => {
  const root = document.getElementById("experiences");
  if (!root) return;

  const cards = [...root.querySelectorAll("[data-exp-card]")];
  const tabs  = [...root.querySelectorAll("[data-exp-tab]")];
  const panels = [...root.querySelectorAll("[data-exp-panel]")];

  const keys = new Set(panels.map(p => p.dataset.expPanel));
  const hashMap = { "#bbq": "bbq", "#pool": "pool", "#trips": "trips", "#kids": "kids" };

  function open(key, { scrollIntoView = false } = {}) {
    if (!keys.has(key)) return;

    cards.forEach(c => c.classList.toggle("is-active", c.dataset.expCard === key));
    tabs.forEach(t => {
      const on = t.dataset.expTab === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    panels.forEach(p => p.classList.toggle("is-active", p.dataset.expPanel === key));

    if (scrollIntoView) {
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // card click
  cards.forEach(c => {
    c.addEventListener("click", (e) => {
      e.preventDefault();
      open(c.dataset.expCard, { scrollIntoView: false });
    });
  });

  // tab click
  tabs.forEach(t => {
    t.addEventListener("click", () => open(t.dataset.expTab, { scrollIntoView: false }));
  });

  // support menu anchors (#bbq/#pool/#trips/#kids)
  function handleHash() {
    const h = window.location.hash;
    const key = hashMap[h];
    if (!key) return;

    // отваряме панела и скролваме към секцията Experiences
    setTimeout(() => open(key, { scrollIntoView: true }), 50);
  }

  window.addEventListener("hashchange", handleHash);

  // init
  open("bbq");
  handleHash();
})();

(() => {
  const grid = document.getElementById("vvGalGrid");
  const lb = document.getElementById("vvLb");
  const img = document.getElementById("vvLbImg");
  const cap = document.getElementById("vvLbCap");
  const stage = document.getElementById("vvLbStage");
  const zoomBtn = document.getElementById("vvLbZoom");

  if (!grid || !lb || !img || !cap || !stage) return;

  const filters = [...document.querySelectorAll("[data-vv-filter]")];
  const cards = [...grid.querySelectorAll(".vv-gal__card")];

  const btnPrev = lb.querySelector("[data-vv-prev]");
  const btnNext = lb.querySelector("[data-vv-next]");
  const closes = [...lb.querySelectorAll("[data-vv-close]")];

  let visible = cards.slice();
  let idx = 0;

  // zoom/pan state (transform-based, no squash)
  let scale = 1;
  let tx = 0, ty = 0;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function refreshVisible(){
    visible = cards.filter(c => !c.classList.contains("is-hidden"));
    if (!visible.length) visible = cards.slice();
  }

  function applyTransform(){
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    zoomBtn.textContent = scale > 1 ? "⤡" : "⤢";
    stage.style.cursor = scale > 1 ? "grab" : "default";
  }

  function resetZoom(){
    scale = 1; tx = 0; ty = 0;
    applyTransform();
  }

  function toggleZoom(){
    if (scale === 1) {
      scale = 2; tx = 0; ty = 0;
    } else {
      scale = 1; tx = 0; ty = 0;
    }
    applyTransform();
  }

  zoomBtn?.addEventListener("click", toggleZoom);

  // open/close
  function openAt(newIdx){
    refreshVisible();
    idx = (newIdx + visible.length) % visible.length;
    const el = visible[idx];
    if (!el) return;

    img.src = el.dataset.full || "";
    img.alt = el.querySelector("img")?.alt || "";
    cap.textContent = el.dataset.caption || "";

    resetZoom();

    lb.hidden = false;
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("vv-lb-open");
  }

  function close(){
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
    img.src = "";
    cap.textContent = "";
    resetZoom();
    document.body.classList.remove("vv-lb-open");
  }

  function next(){ openAt(idx + 1); }
  function prev(){ openAt(idx - 1); }

  cards.forEach((c) => {
    c.addEventListener("click", () => {
      refreshVisible();
      const at = visible.indexOf(c);
      openAt(at >= 0 ? at : 0);
    });
  });

  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);
  closes.forEach(x => x.addEventListener("click", close));

  lb.addEventListener("click", (e) => {
    if (e.target?.hasAttribute?.("data-vv-close")) close();
  });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // double click / double tap zoom
  img.addEventListener("dblclick", toggleZoom);

  let lastTap = 0;
  img.addEventListener("touchend", () => {
    const now = Date.now();
    if (now - lastTap < 280) toggleZoom();
    lastTap = now;
  }, { passive: true });

  // swipe (only when not zoomed)
  let sx=0, sy=0, swiping=false;
  stage.addEventListener("touchstart", (e) => {
    if (scale > 1) return;
    const t = e.touches[0];
    sx = t.clientX; sy = t.clientY;
    swiping = true;
  }, { passive: true });

  stage.addEventListener("touchend", (e) => {
    if (!swiping || scale > 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx;
    const dy = t.clientY - sy;
    swiping = false;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx < -50) next();
    else if (dx > 50) prev();
  }, { passive: true });

  // pan (pointer) when zoomed
  let dragging = false, px=0, py=0;
  stage.addEventListener("pointerdown", (e) => {
    if (scale === 1) return;
    dragging = true;
    px = e.clientX; py = e.clientY;
    stage.setPointerCapture(e.pointerId);
    stage.style.cursor = "grabbing";
  });

  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    px = e.clientX; py = e.clientY;

    tx += dx;
    ty += dy;

    // basic clamp (prevent losing image too far)
    const maxX = stage.clientWidth * 0.6;
    const maxY = stage.clientHeight * 0.6;
    tx = clamp(tx, -maxX, maxX);
    ty = clamp(ty, -maxY, maxY);

    applyTransform();
  });

  stage.addEventListener("pointerup", () => {
    dragging = false;
    stage.style.cursor = scale > 1 ? "grab" : "default";
  });
  stage.addEventListener("pointercancel", () => {
    dragging = false;
    stage.style.cursor = scale > 1 ? "grab" : "default";
  });

  // Filters
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.vvFilter || "all";

      filters.forEach(b => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });

      cards.forEach(c => {
        const tag = c.dataset.vv || "";
        const hide = key !== "all" && tag !== key;
        c.classList.toggle("is-hidden", hide);
      });

      refreshVisible();
    });
  });

  refreshVisible();
})();

(() => {
  // ---- COPY ADDRESS ----
  const copyBtn = document.getElementById("vvCopyAddress");
  const addressText = `Villa Vilekula, ул. „Лате“ 7, с. Зелен Дол, България`;

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(addressText);
      const old = copyBtn.textContent;
      copyBtn.textContent = "Копирано ✅";
      setTimeout(() => (copyBtn.textContent = old), 1200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = addressText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      const old = copyBtn.textContent;
      copyBtn.textContent = "Копирано ✅";
      setTimeout(() => (copyBtn.textContent = old), 1200);
    }
  });

  // ---- NEARBY DATA (измислено) ----
  const places = [
    {
      type: "sights",
      tag: "Забележителност",
      name: "Старинен мост „Каменната дъга“",
      km: 3.2,
      desc: "Кратка разходка до фотогеничен каменен мост и гледка към долината.",
      img: "img/batunski-manastir.webp"
    },
    {
      type: "nature",
      tag: "Природа",
      name: "Еко пътека „Борова тишина“",
      km: 4.7,
      desc: "Лека пътека през борова гора, подходяща и за деца. Панорама на финала.",
      img: "img/batunski-manastir.webp"
    },
    {
      type: "food",
      tag: "Ресторант",
      name: "Механа „Зеленик“",
      km: 6.1,
      desc: "Традиционна кухня, скара и домашни десерти. Уютна градина лятото.",
      img: "img/bbq.webp"
    },
    {
      type: "shops",
      tag: "Магазин",
      name: "Маркет „Съседите“",
      km: 5.4,
      desc: "Всичко необходимо за уикенд — напитки, закуски, дървени въглища.",
      img: "img/basein.webp"
    },
    {
      type: "nature",
      tag: "Природа",
      name: "Река „Студена вода“",
      km: 2.6,
      desc: "Къса разходка до прохладна река — идеално за пикник и снимки.",
      img: "img/basein.webp"
    },
    {
      type: "sights",
      tag: "Забележителност",
      name: "Параклис „Св. Светлина“",
      km: 7.9,
      desc: "Малък параклис с тиха атмосфера и изгреви, които си заслужават.",
      img: "img/batunski-manastir.webp"
    },
    {
      type: "food",
      tag: "Кафене",
      name: "Coffee & View",
      km: 8.4,
      desc: "Специално кафе и сладкиши, тераса с гледка към залеза.",
      img: "img/basein.webp"
    },
    {
      type: "shops",
      tag: "Аптека",
      name: "Аптека „Близо“",
      km: 9.1,
      desc: "Основни лекарства и козметика. Удобно при непредвидени ситуации.",
      img: "img/basein.webp"
    }
  ];

  const grid = document.getElementById("vvNearGrid");
  const filterBtns = [...document.querySelectorAll("[data-near]")];

  if (!grid) return;

  function card(p) {
    const el = document.createElement("article");
    el.className = "vv-place";
    el.dataset.type = p.type;

    el.innerHTML = `
      <div class="vv-place__media">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="vv-place__tag">${p.tag}</span>
      </div>
      <div class="vv-place__body">
        <h4 class="vv-place__name">${p.name}</h4>
        <p class="vv-place__desc">${p.desc}</p>
        <div class="vv-place__meta">
          <span>Разстояние</span>
          <span class="vv-place__km">${p.km.toFixed(1)} km</span>
        </div>
      </div>
    `;
    return el;
  }

  // render
  const nodes = places.map(card);
  nodes.forEach(n => grid.appendChild(n));

  // filter
  function setFilter(key) {
    filterBtns.forEach(b => {
      const on = (b.dataset.near || "all") === key;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });

    nodes.forEach(n => {
      const t = n.dataset.type;
      const hide = key !== "all" && t !== key;
      n.classList.toggle("is-hidden", hide);
    });
  }

  filterBtns.forEach(b => {
    b.addEventListener("click", () => setFilter(b.dataset.near || "all"));
  });

  setFilter("all");
})();

(() => {
  const btn = document.getElementById("vvCopyContactAddr");
  if (!btn) return;

  const address = "Villa Vilekula, ул. „Лате“ 7, с. Зелен Дол, България";

  btn.addEventListener("click", async () => {
    const old = btn.textContent;
    try {
      await navigator.clipboard.writeText(address);
      btn.textContent = "Копирано ✅";
    } catch {
      const ta = document.createElement("textarea");
      ta.value = address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      btn.textContent = "Копирано ✅";
    }
    setTimeout(() => (btn.textContent = old), 1200);
  });
})();

(() => {
  const form = document.getElementById("bookingForm2");
  const success = document.getElementById("bookingSuccess2");
  const captcha = document.getElementById("captcha2");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (captcha.value.trim() !== "3") {
      alert("Грешен отговор. Опитай пак.");
      return;
    }

    success.classList.add("is-show");
    form.reset();
  });
})();


document.getElementById("year").textContent = new Date().getFullYear();


/* ===================================
   AUTO GLOBAL SITE ANIMATION
   =================================== */

   document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
      "section h2, section h3, section p, section .btn, section .stay-card, section .spa-card, section .exp-card, section .vv-contact__card, section .vv-gal__card"
    );
  
    const directions = ["left", "right", "up", "rotate"];
  
    elements.forEach((el, index) => {
      el.classList.add("vv-animate");
  
      // rotate directions automatically
      const dir = directions[index % directions.length];
      el.setAttribute("data-dir", dir);
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.15 });
  
    document.querySelectorAll(".vv-animate").forEach(el => {
      observer.observe(el);
    });
  
  });
  