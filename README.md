# Jesus Worship Interdenominational Prayer Ministry Int&apos;l Website (React + Vite)

A responsive React website with weekly activities, a Sunday service photo gallery,
and a YouTube-connected live stream player.

## Structure
```
index.html                 Vite entry HTML
src/main.jsx                React entry point
src/App.jsx                 Composes all page sections
src/index.css               Global styles
src/config.js                YouTube channel/video configuration
src/data/activities.js       Weekly activities content
src/data/gallery.js          Gallery image list
src/components/              Header, Hero, About, Activities, Gallery, Lightbox,
                              LiveStream, Contact, Footer components
public/images/hero.jpg       Hero background image (add your own)
public/images/gallery/       Sunday service photos (service-1.jpg ... service-6.jpg)
```

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Run the dev server**
   ```
   npm run dev
   ```

3. **Add images**
   - Place a hero background photo at `public/images/hero.jpg`.
   - Add Sunday service photos to `public/images/gallery/` named `service-1.jpg` through `service-6.jpg`
     (or edit `src/data/gallery.js` to add/remove/rename gallery items).

4. **Connect your YouTube channel**
   - Open `src/config.js`.
   - Set `YOUTUBE_CHANNEL_ID` to your church's YouTube channel ID
     (found in YouTube Studio → Settings → Channel → Advanced settings).
   - When your channel is live, the embed automatically shows the live broadcast.
     When offline, YouTube shows your channel's most recent upload/scheduled stream.
   - Optionally set `YOUTUBE_FALLBACK_VIDEO_ID` to always show a specific video instead.

5. **Update contact details and activity times** in `src/data/activities.js` and `src/components/Contact.jsx`.

6. **Build for production**
   ```
   npm run build
   ```
   Deploy the generated `dist/` folder to GitHub Pages, Netlify, Vercel, or any static host.

7. **Contact form**
   - The form currently just shows a confirmation message. To actually receive messages,
     connect it to a form backend (e.g. Formspree, Netlify Forms) or your own server endpoint.
