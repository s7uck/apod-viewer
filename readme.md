# APOD Viewer
View NASA's hand-picked [Astronomy Picture Of the Day](https://apod.nasa.gov/apod/astropix.html) and browse the ever-growing, 30+ years-old [gallery of space images](https://apod.nasa.gov/apod/archivepixfull.html).
This website uses NASA's [public APIs](https://api.nasa.gov)[^note]
| ![Desktop](https://user-images.githubusercontent.com/71439748/181296264-86f68bee-dfb8-495d-a19d-a288abd64e83.png) | ![Mobile](https://user-images.githubusercontent.com/71439748/181300052-f3e718d9-033b-4412-b342-c074804c645a.png) |
| :---: | :---: |


## Features
- A full screen, adaptive image view
- A professional astronomer's explanation of the image
- A date picker for browsing the archive

## How to use
- Open [**apodviewer.github.io**](https://apodviewer.github.io).
- Hover on the image to view it fully.
- Click on the image to get a full-size file.
- Use the date picker to check out pictures from **June 16, 1995** to this day, along with their explanations.
- Check out the featured photographer, or view the image on the original APOD website.

## How it works
In an effort to avoid making too many API requests while browsing the APOD, this website caches the JSON result in a cookie.
The result contains all information about the picture, including the image URL, the copyright holder (or lack thereof), the
full explanation and summary.
Occasionally, APOD will feature content like videos or small games, embedded in `<iframe>`s. To show this content on APOD Viewer,
the code checks for the `hdurl` property of the APOD: if not present the content is likely not an image and the `<img>` element will
be replaced with an `<iframe>`.

[^note]: Right now, the website is limited to **30 requests/hour** per IP address, due to the demo API's restrictions.
Unfortunately I currently have no way to store my personal API key that would allow for limitless browsing, so until I move out of Github Pages,
exceeding the request limit will show [an error](error.jpg).
