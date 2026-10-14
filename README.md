# 🌐 Emoji Cisco Networking Academy — Website

The marketing website for **Emoji Cisco Networking Academy**, a networking training
academy in Lagos, Nigeria. Built as a fast, dependency-free static site aimed at both
complete beginners and working engineers.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home — hero, learning path, featured programs, stats, testimonials, FAQ |
| `courses.html` | Full course catalog with track filters (Foundation, Routing & Switching, Security, Automation, Cloud) |
| `about.html` | Academy story, mission & values, 10-year timeline, accreditation |
| `instructors.html` | Certified instructor profiles and "teach with us" section |
| `pricing.html` | Three tuition options, comparison table, instalments & scholarships |
| `contact.html` | Enrollment enquiry form (client-side validated) + campus info & map |

## Structure

```
├── index.html
├── courses.html
├── about.html
├── instructors.html
├── pricing.html
├── contact.html
├── css/
│   └── styles.css      # Design system + all page styles
├── js/
│   └── main.js         # Nav, filters, accordions, counters, form validation
└── README.md
```

## Design

- Clean Cisco-inspired palette (Cisco blue `#00bceb`, deep navy `#0e2438`)
- Inter + JetBrains Mono typography
- Animated hero network-topology (pure SVG + CSS, no images)
- Scroll-reveal animations, animated stat counters, FAQ accordion
- Fully responsive (desktop → mobile) with a hamburger menu
- Accessible: skip link, ARIA labels, keyboard-operable controls, reduced-motion support

## Running locally

No build step required — any static file server works:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000

## Deploying

The site is plain HTML/CSS/JS, so it can be hosted on GitHub Pages, Netlify, Vercel
or any web host by uploading the folder contents.

---

© Emoji Cisco Networking Academy. Built for engineers who keep the internet running.
