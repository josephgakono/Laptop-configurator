# Smart Laptop Configurator

A modern React + Vite laptop configurator that lets users customize a laptop build, preview downloaded laptop photos, calculate estimated price, performance, and battery scores, save builds to `localStorage`, and compare them side by side.

## Tech stack

- React functional components
- React Router
- Plain CSS
- Fetch API
- localStorage
- Public API for featured laptop cards only

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Image asset location

Preview photos live in:

```text
public/laptop-previews/
```

The project includes:

- Silver laptop photo
- Black laptop photo
- Blue laptop photo
- Gaming chassis laptop photo
- Slim chassis laptop photo
- Extra distinctive laptop photos for alternate chassis and color combinations

If you want to replace them with downloaded PNG, JPG, or SVG laptop assets:

1. Put the replacement files inside `public/laptop-previews/`
2. Update the file paths in `src/data/previewImages.js`
3. Keep the same mapping pattern so color and chassis changes continue to swap correctly

## App features

- Home page with intro, saved build summary, and featured products fetched from a public API
- Configurator page with a responsive 3-column layout
- Public-folder image preview that changes by color and chassis
- Visual laptop resizing when laptop size changes
- Derived local calculations for price, performance score, and battery score
- Saved builds page with compare and delete actions
- Graceful API loading and error states

## Live demo & GitHub Repository
1. Click [Live Demo]() to get the live preview of the website.
<br>
2. Click [GitHub Repository](https://github.com/josephgakono/Laptop-configurator) to get the repository.
