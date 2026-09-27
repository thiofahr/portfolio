# Thio Fahrizqi — Portfolio

Personal portfolio website built with plain HTML, CSS, and JavaScript. No build tools or dependencies required.

## Structure

```
portfolio/
├── index.html          # Main HTML — all three pages (About, Resume, Portfolio)
├── css/
│   └── style.css       # All styles, layout, and responsive rules
├── js/
│   ├── main.js         # Navigation tab switching
│   └── graph.js        # Interactive interest network graph (canvas-based)
├── assets/             # Place profile photo and other images here
│   └── profile.jpg     # (optional) Profile photo — reference in index.html
└── README.md
```

## Usage

Open `index.html` directly in any browser — no server needed for local viewing.

To serve over your local network (e.g. to view on your phone on the same WiFi):

```bash
# Python
python -m http.server 8080

# Node.js
npx serve . -p 8080
```

Then open `http://<your-local-ip>:8080` on your phone.

## Deployment (GitHub Pages)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder `/`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Customisation

| What | Where |
|---|---|
| Name, title, bio | `index.html` — `page-about` section |
| Work experience | `index.html` — `page-resume` section |
| Projects | `index.html` — `page-portfolio` section |
| Graph nodes & links | `js/graph.js` — `NODES` and `LINKS` arrays |
| Colours | `css/style.css` — `:root` variables |
| Profile photo | Replace `TF` initials with `<img>` tag in `.about-avatar` |
