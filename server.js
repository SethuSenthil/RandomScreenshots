const express = require("express");
const app = express();

function randomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function randomOnesNumber() {
    return ~~(Math.random() * 10)
}

//useragent to spoof request (this value is extracted from my iPhone)
const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1"


// get random image
app.get("/", (request, response) => {
    const domain = 'https://prnt.sc/'
    const randomShit = randomLetter() + randomLetter() + randomOnesNumber() + randomOnesNumber() + randomOnesNumber() + randomOnesNumber()
    const url = domain + randomShit
    console.log(url)
    const fetch = require('node-fetch');
    fetch(url, {
            headers: {
                Host: "prnt.sc",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "User-Agent": ua,
                "Accept-Language": "en-us",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            }
        })
        .then(res => res.text())
        .then(body => {
            try {
                let img = body.split('<img class="no-click screenshot-image" src="')[1].split('"')[0]
                console.log(img)
                if (img.indexOf('http') !== -1) {
                    const image2base64 = require('image-to-base64');

                    image2base64(img)
                        .then(
                            (imgres) => {
                                response.json({
                                    img: imgres,
                                    tryagain: false,
                                    id: randomShit,
                                    url: url
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error);
                            }
                        )

                } else {
                    response.json({
                        tryagain: true,
                        reason: 'image is deleted',
                        id: randomShit,
                    })
                }

            } catch (err) {
                console.log('image does not exist')
                response.json({
                    tryagain: true,
                    reason: 'image does not exist',
                    id: randomShit,
                })

            }

        });
});


//get image by ID
app.get("/id/:id", (request, response) => {
    const domain = 'https://prnt.sc/'
    const url = domain + request.params.id
    console.log(url)
    const fetch = require('node-fetch');
    fetch(url)
        .then(res => res.text())
        .then(body => {
            try {
                let img = body.split('<img class="no-click screenshot-image" src="')[1].split('"')[0]
                console.log(img)
                if (img.indexOf('http') !== -1) {
                    const image2base64 = require('image-to-base64');

                    image2base64(img)
                        .then(
                            (imgres) => {
                                response.json({
                                    img: imgres,
                                    tryagain: false,
                                    id: request.params.id,
                                    url: url
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error);
                            }
                        )

                } else {
                    response.json({
                        tryagain: true,
                        reason: 'image is deleted',
                        id: randomShit,
                    })
                }

            } catch (err) {
                console.log('image does not exist')
                response.json({
                    tryagain: true,
                    reason: 'image does not exist',
                    id: randomShit,
                })

            }

        });
});


const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});