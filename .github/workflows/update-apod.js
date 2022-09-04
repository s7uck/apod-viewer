console.log(process.argv);
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = require("jsdom");
APOD    = ({ copyright, date, explanation, hdurl, title, url }) =>
`
<img src="${hdurl ?? url}" alt="${title}">
<main>
  <h1>${title}</h1>
  <article>
    ${explanation.split('    ')[0]}
  </article>
  <br><br>
  <input id="timestamp" type="date" min="1995-06-16" max="${new Date().toISOString().split('T')[0]}" value="${date}">
  <a href="https://apod.nasa.gov/apod/astropix.html"><address id="credits">${copyright ? ('© ' + copyright) : ('⨀ ' + 'Public domain')}</address></a>
</main>
`

function main(apod) {
  fs.writeFileSync('index.html',
`
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" title="${apod.title || 'Astronomy Picture of the Day'}">
    <title>${apod.title || 'Astronomy Picture of the Day'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${apod.explanation || 'Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.'}">
    <meta name="author" content="${apod.copyright || 'Public domain'}">

    <meta property="og:title" content="${apod.title || 'APOD Viewer'}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://apod.nasa.gov/apod/astropix.html">
    <meta property="og:locale" content="en">
    <meta property="og:description" content="${apod.explanation || 'Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.'}">
    <meta property="og:image" content="${apod.url}">
    <meta property="og:image:secure_url" content="${apod.url}">
    <meta property="og:image:type" content="image/jpeg">
    <meta http-equiv="SameSite" content="Strict">

    <meta name="color-scheme" content="dark">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="https://apod.nasa.gov/apod/calendar/today.jpg">
    <script defer src="script.js"></script>
  </head>
  <body>
    ${
      APOD(apod)
    }
  </body>
</html>

`)
}
main(JSON.parse(
    fs.readFileSync(process.argv[2], { encoding: 'utf-8', flag: 'r' })))
