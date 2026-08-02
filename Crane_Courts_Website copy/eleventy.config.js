/* ==========================================================================
   Crane Courts — build config (Eleventy)

   What this does, in plain words:
   Every event on the News page is a small file in the "events" folder.
   This config reads those files and writes them into news.html when Vercel
   publishes the site. Nothing else on the site changes: index.html,
   ueber-uns.html and impressum.html are copied over 1:1, exactly as they are.

   If a new subpage is ever added, put its filename into COPY_AS_IS below,
   otherwise Eleventy will rename it (about.html would become about/).
   ========================================================================== */

const markdownIt = require("markdown-it");

// Pages that contain no event loop: copied straight through, no processing.
const COPY_AS_IS = ["index.html", "ueber-uns.html", "impressum.html"];

// Folders and files that just need to land in the published site unchanged.
const ASSETS = ["styles.css", "Images", "font"];

module.exports = function (eleventyConfig) {
  COPY_AS_IS.forEach((file) => {
    eleventyConfig.ignores.add(file);
    eleventyConfig.addPassthroughCopy(file);
  });

  ASSETS.forEach((asset) => eleventyConfig.addPassthroughCopy(asset));

  /* Line breaks the client types in the CMS should show up as line breaks on
     the page, the way the hand written event text did. */
  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true, breaks: true, linkify: true })
  );

  /* Dates are read as UTC on purpose. A date typed as 2026-08-02 must print as
     02. 08. 2026 in every timezone the build server happens to run in. */
  const pad = (n) => String(n).padStart(2, "0");

  eleventyConfig.addFilter("dateISO", (value) => {
    const d = new Date(value);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  });

  // 02. 08. 2026 — the spaced form used above the headline
  eleventyConfig.addFilter("dateLong", (value) => {
    const d = new Date(value);
    return `${pad(d.getUTCDate())}. ${pad(d.getUTCMonth() + 1)}. ${d.getUTCFullYear()}`;
  });

  // 02.08.2026 — the tight form used inside the blue panel
  eleventyConfig.addFilter("dateShort", (value) => {
    const d = new Date(value);
    return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
  });

  // Newest event on top
  eleventyConfig.addCollection("events", (collectionApi) =>
    collectionApi
      .getFilteredByTag("event")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
};
