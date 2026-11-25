# ReelLog — My Cinema Archive

A responsive personal movie-theatre archive built with HTML, CSS and vanilla JavaScript.

[Website URL] https://nishanthkj77.github.io/reellog-cinema/
## Features
- 27 preloaded theatre experiences, including both LEO visits:
  - Cauvery Theatre, Trichy
  - Ram Cinemas, Perambalur
- Search by movie, theatre, location or memory note
- Filter by location and sort the collection
- Grid/list view toggle
- Add, edit and delete movie memories
- Optional poster URL, watched date, personal rating and notes
- Responsive layout, dark/light theme and subtle motion
- Browser localStorage persistence

## Run locally
Open `index.html` in a modern browser. No build tools or server are required.

## Add posters
Use a direct image URL in the poster field. The image should be publicly accessible and end in a supported image format or serve an image directly. If no poster is supplied, ReelLog displays a designed title treatment.

## Data storage
This version stores changes in the current browser using localStorage. Data does not automatically sync between devices or browsers. Export/import and a database-backed version can be added later.

## Publish with GitHub Pages
1. Create a new public repository on GitHub, for example `reellog-cinema-archive`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then Save.
6. Wait for GitHub Pages to publish the site. The URL will look like `https://YOUR-USERNAME.github.io/reellog-cinema-archive/`.

Keep in mind that browser localStorage belongs to the browser/device that uses the site. A public website does not mean your saved movie data is stored in a shared cloud database.
