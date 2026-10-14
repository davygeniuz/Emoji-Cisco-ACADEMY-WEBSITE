/* ============================================================
   Emoji Cisco Networking Academy — Motion & Interactions
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const easeExpo = "cubic-bezier(0.16, 1, 0.3, 1)";

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector(".scroll-progress");
  const header = document.querySelector(".header");
  const toTop = document.querySelector(".to-top");

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (header) header.classList.toggle("header--scrolled", y > 10);
      if (toTop) toTop.classList.toggle("show", y > 600);
      // Hero parallax
      const visual = document.querySelector(".hero__visual");
      if (visual && y < window.innerHeight * 1.2 && !prefersReduced) {
        visual.style.transform = `translateY(${y * -0.055}px)`;
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Active nav link ---------- */
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------- Split headings into animatable words ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    const offset = parseFloat(el.dataset.splitOffset || "0");
    el.textContent = "";
    words.forEach((word, i) => {
      const wrap = document.createElement("span");
      wrap.className = "split-word";
      const inner = document.createElement("span");
      inner.textContent = word;
      inner.style.transitionDelay = `${0.06 + offset + i * 0.06}s`;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1800;
    const start = performance.now();
    const fmt = (v) => v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- Pointer glare on cards ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".card, .price-card, .course-card, .quote-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- 3D tilt on cards ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const strength = parseFloat(card.dataset.tilt) || 6;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${py * -strength}deg) rotateY(${px * strength}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const btn = item.querySelector(".faq__q");
    const panel = item.querySelector(".faq__a");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      const group = item.closest(".faq");
      if (group) {
        group.querySelectorAll(".faq__item.open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            other.querySelector(".faq__a").style.maxHeight = null;
            other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
          }
        });
      }
      item.classList.toggle("open", !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ---------- Course / track filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll("[data-track]");
  if (filterBtns.length && courseCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        let shown = 0;
        courseCards.forEach((card) => {
          const match = filter === "all" || card.dataset.track === filter;
          card.style.display = match ? "" : "none";
          if (match) {
            shown++;
            card.classList.remove("visible");
            requestAnimationFrame(() =>
              requestAnimationFrame(() => card.classList.add("visible"))
            );
          }
        });
        const empty = document.querySelector(".courses-empty");
        if (empty) empty.style.display = shown ? "none" : "block";
      });
    });
  }

  /* ---------- Form validation ---------- */
  const form = document.querySelector("#enroll-form");
  if (form) {
    const success = form.querySelector(".form-success");
    const validators = {
      required: (input) => input.value.trim().length > 0,
      email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim()),
      phone: (input) => input.value.trim() === "" || /^[+\d][\d\s()-]{6,}$/.test(input.value.trim()),
    };

    const validateField = (input) => {
      let ok = true;
      if (input.required) ok = validators.required(input);
      if (ok && input.type === "email") ok = validators.email(input);
      if (ok && input.name === "phone") ok = validators.phone(input);
      input.classList.toggle("invalid", !ok);
      const err = input.parentElement.querySelector(".field-error");
      if (err) err.classList.toggle("show", !ok);
      return ok;
    };

    form.querySelectorAll(".form-control").forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) validateField(input);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll(".form-control").forEach((input) => {
        if (!validateField(input)) valid = false;
      });
      if (!valid) {
        const firstInvalid = form.querySelector(".form-control.invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Sending…";
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => success.classList.remove("show"), 9000);
        }
      }, 900);
    });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      const msg = form.querySelector(".newsletter-msg");
      if (!input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        input.classList.add("invalid");
        if (msg) msg.textContent = "Please enter a valid email address.";
        return;
      }
      input.classList.remove("invalid");
      if (msg) msg.textContent = "Subscribed — watch your inbox.";
      input.value = "";
    });
  });

  /* ---------- Back to top ---------- */
  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
    );
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
