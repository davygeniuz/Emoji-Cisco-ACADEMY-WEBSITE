/* ============================================================
   Emoji Cisco Networking Academy — Core Script
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (header) header.classList.toggle("header--scrolled", window.scrollY > 8);
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
    // Close when a link is tapped
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
  document.querySelectorAll(".nav__link, .mobile-nav .nav__link").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = (target * eased).toFixed(decimals);
      el.textContent = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      { threshold: 0.5 }
    );
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const btn = item.querySelector(".faq__q");
    const panel = item.querySelector(".faq__a");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close siblings in the same accordion group
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

  /* ---------- Course filter ---------- */
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
            requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("visible")));
          }
        });
        const empty = document.querySelector(".courses-empty");
        if (empty) empty.style.display = shown ? "none" : "block";
      });
    });
  }

  /* ---------- Contact form validation ---------- */
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
      btn.innerHTML = "Submitting…";
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => success.classList.remove("show"), 8000);
        }
      }, 900);
    });
  }

  /* ---------- Newsletter (footer) ---------- */
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
      if (msg) msg.textContent = "Subscribed! Watch your inbox for networking tips.";
      input.value = "";
    });
  });

  /* ---------- Back to top ---------- */
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      () => toTop.classList.toggle("show", window.scrollY > 600),
      { passive: true }
    );
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
