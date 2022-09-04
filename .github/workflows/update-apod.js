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
    ${explanation}
  </article>
  <br><br>
  <input id="timestamp" type="date" min="1995-06-16">
  <input id="search" type="search" placeholder="Search" list="searchlist">
  <a href="https://apod.nasa.gov/apod/astropix.html"><address id="credits">${copyright}</address></a>
</main>
`

function main(apod) {
  fs.writeFileSync('index.html',
`
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>${apod.title || 'Astronomy Picture of the Day'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta title="${apod.title || 'APOD Viewer'}">
    <meta name="description" content="${apod.explanation || 'Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.'}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&display=swap">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js" defer></script>
    <link rel="icon" href="https://apod.nasa.gov/apod/calendar/today.jpg">

    <meta property="og:title" content="${apod.title || 'APOD Viewer'}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://apod.nasa.gov/apod/astropix.html">
    <meta property="og:locale" content="en">
    <meta property="og:description" content="${apod.explanation || 'Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.'}">
    <meta property="og:image" content="${apod.url}">
    <meta property="og:image:secure_url" content="${apod.hdurl}">
    <meta property="og:image:type" content="image/jpeg">
    <meta http-equiv="SameSite" content="Strict">
  </head>
  <body>
    ${
      APOD(apod)
    }
    <datalist id="searchlist">
    </datalist>
  </body>
</html>

`)
}
main(JSON.parse(process.argv[2]))