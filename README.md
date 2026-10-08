# Do You Love Me? Animation

A responsive love-themed page built with React, TypeScript, and Vite. It recreates the look and interactions of Joan’s live `valentines-day` page: a rich red gradient, floating hearts, a cute animated character, a growing “Yes” button, playful “No” messages, a celebration screen, and an optional music toggle.

## Run locally

```sh
pnpm install
pnpm run dev
```

Open the local URL printed by Vite.

## Build for GitHub Pages

```sh
pnpm run build
```

The Vite config uses a relative base path, so the build works from a GitHub Pages project repository. To publish with the included script, run `pnpm run deploy`. Then choose **Settings → Pages → Deploy from a branch**, select the `gh-pages` branch, and select `/(root)`.

## Customize

- Edit the title and button messages in `src/App.tsx`.
- Change the gradient, motion, and button styles in `src/App.css`.
- Replace the character GIF URLs in `src/App.tsx` to use your preferred images.
- The music button loads `freepik-love-in-laughter.mp3` from Joan’s existing public GitHub Pages site. To make the project independent, put your own licensed audio file in `public/` and update the `src` in `src/App.tsx`.

The project retains the upstream MIT license from the starter repository. The animation, color styling, and interactions here are a new implementation based on the linked live page.

## Authentication and data flow

This is a static, client-side React application. It does **not** implement sign-in, authentication, sessions, credentials, API tokens, or a backend. The `src/main.tsx` entry point renders `src/App.tsx`. Button clicks update local React state (`noCount`, `yesPressed`, and `toast`) and render different text, images, and confetti. The music control operates a browser `<audio>` element. External Tenor GIFs and an MP3 are fetched as public media URLs, with no credentials or authorization headers. Publishing through GitHub Pages is separate from application authentication: the deployment command uses your locally configured GitHub access, not credentials embedded in this project.
