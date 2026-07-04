# InAmigos Foundation - Professional NGO Website

A clean, professional NGO website built with HTML5, CSS3, and Vanilla JavaScript. No frameworks, no placeholder graphics, no emojis — just real content, real images, and a production-quality design.

## Project Structure

```
inamigos-pro/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/   (local image overrides)
│   └── icons/    (svg icons)
└── README.md
```

## Features

- Sticky navbar that transitions from transparent to white on scroll
- Split hero layout with a real Unsplash volunteer photograph
- About section with mission, vision, and story
- Four alternating zig-zag project layouts (Education, Healthcare, Women Empowerment, Community Development)
- Animated counter dashboard for key impact metrics
- Masonry-style campaign gallery with hover overlays
- Three professional testimonial cards with real profile photos
- Full-bleed volunteer CTA section with a background image
- Contact section with form validation
- Multi-column footer with newsletter signup
- Scroll-reveal animations on all sections (fade up, fade left, fade right)
- Scroll progress bar
- Fully responsive: desktop, tablet, and mobile

## Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, no frameworks)
- Vanilla JavaScript (ES6+, no libraries)

## Images

All images load directly from Unsplash CDN. No downloads required. To swap in local images, place them in `assets/images/` and update the `src` attributes in `index.html`.

## Running Locally

Open `index.html` directly in any modern browser. No build step needed.

For a local dev server:
```
npx serve .
```
or
```
python -m http.server 8000
```

## Color Tokens

| Token         | Value     |
|---------------|-----------|
| Primary       | #FF7A00   |
| Secondary     | #0B1F3A   |
| Background    | #FFFFFF   |
| Light Gray    | #F7F8FA   |
| Text          | #222222   |
| Text Light    | #6B7280   |

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
