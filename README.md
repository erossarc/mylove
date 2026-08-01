# A Letter Just For You 💌

A single-page romantic proposal website. Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Files
- `index.html` — page structure
- `style.css` — all styling, colors, animations
- `script.js` — all interactivity
- `song.mp3` (optional, not included) — drop your own music file here with this exact name to enable the music toggle

## How to host on GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` (and `song.mp3` if you want music) to the root of the repo.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## How the NO button works
- If the cursor (or a touch) gets close, it slides away smoothly — just a dodge.
- The instant she actually tries to click or tap it, it disappears (fades + shrinks out), a new random spot is picked that never overlaps YES and never goes off-screen, and it reappears there (fades + grows back in) with a funny message.
- This disappear → reappear cycle repeats every single time, forever. It can never actually be pressed — only YES works.

## Customizing
- **The letter text**: edit the `LOVE_LETTER_TEXT` string in `script.js`.
- **Colors**: edit the CSS variables at the top of `style.css` (`--blush`, `--lavender`, `--white`, `--rose-gold`).
- **Funny "NO" messages**: edit the `FUNNY_MESSAGES` array in `script.js`.
- **Fonts**: swap the Google Fonts link in `index.html` and update `--font-heading` / `--font-body` in `style.css`.
- **Music**: add an mp3 file named `song.mp3` next to `index.html`. The toggle button already works — it just needs a file to play.

Made with ❤️
