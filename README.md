# 🌐 Emoji Cisco Networking Academy — Website

The official website for **Emoji Cisco Networking Academy** — Emoji Digitals, in
strategic collaboration with the Cisco Networking Academy — presenting the
**Cisco-Emoji Digitals Tech & Creative Skills Program** for Nigerian secondary schools.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home — the digital divide, learning tracks, what schools gain, delivery model, impact goals, FAQ |
| `courses.html` | Programs & tracks — Tech Track, Creative Track, delivery model, school requirements, certifications |
| `about.html` | About — story, mission & values, milestones to 2028, impact goals |
| `instructors.html` | Our Team — who delivers the program, teacher training & instructor development |
| `pricing.html` | Plans & pricing — Academy-Basic, Academy-Hybrid, small-school rate, comparison table |
| `contact.html` | Contact — school partnership enquiry form, HQ & branch offices, map |

## Program facts (from the official proposal)

- **Target students**: SS1 to SS3 (ages 12–18)
- **Tracks**: Tech (Python, Cybersecurity, AI, Networking, Software & Web Development, Data)
  and Creative (Graphic Design, Video Editing, Digital Marketing)
- **Term**: 3 months, aligned with the academic calendar
- **Sessions**: 1–3 per week based on plan · max 30 students per batch
- **Learning mode**: 70% in-school lab, 30% Cisco NetAcad virtual
- **Instructors**: Cisco-certified trainers + trained school staff
- **School requirements**: min 10 PCs (Core i5+, 8GB RAM), min 10 Mbps broadband,
  Python 3.x / Cisco Packet Tracer / Adobe tools, a designated coordinator
- **Plans**: Academy-Basic ₦1M monthly / ₦3M termly (150–499 students, 3+ sessions/week) ·
  Academy-Hybrid ₦5M termly (500–1000 students, 6+ sessions/week, full lab + solar setup) ·
  Small schools (50–149): ₦20,000 monthly per student
- **Affiliate incentives**: up to ₦200,000 per term for partner schools
- **Impact goals 2026–2028**: 5,000+ students trained, 50+ school labs deployed,
  100+ Cisco-certified instructors developed, Cisco Academy TechFest Nigeria hosted

## Contact

- **HQ**: Cisco Atlantic House, 121 Louis Solomon Close, Victoria Island, Lagos
- **Branch**: No 13 Rear Admiral Ozojiofor Street, 420110, Awka, Anambra State
- **Email**: emojidigitals@gmail.com
- **Phone/WhatsApp**: +234 810 298 2020 · +234 806 951 1029
- **Web**: www.emojidigitals.com · www.netacad.com

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

Built on a Cisco-inspired brand system:

- **Palette**: Cisco Blue `#00bceb`, Cisco Dark Navy `#0e2749`, soft grey `#f5f8fb`
- **Type**: Space Grotesk (display), Inter (body), JetBrains Mono (labels)
- **Logos**: authentic Cisco bridge mark + Emoji Digitals globe lockup, inline SVG
- **Motion**: aurora mesh gradients, word-by-word heading reveals, pointer-glare
  cards, 3D tilt, magnetic buttons, marquee, scroll progress, parallax hero,
  animated counters, smooth accordions
- Fully responsive (desktop → mobile), accessible (skip link, ARIA, focus rings,
  `prefers-reduced-motion` respected)

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

Plain HTML/CSS/JS — host on GitHub Pages, Netlify, Vercel or any web host by
uploading the folder contents.

---

Sign up. Stand out. Shape the future.
