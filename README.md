# Random Screenshots from Lightshot

This is a REST API to get random images from the LightShot screenshoting software


## Backstory

Lightshot is a very convient screenshoting software which is used by many people. However, it uploades their screenshots to the web.
By doing a little bit of experimenting, I was able to find the paramaters in which these screenshots are uploaded and made accessable by the web.

## How it works
The code randomely generates a lightshot screenshot URL and attempts to extract the image URL. However much cannot be done using the image URL
because of the CORES polocy which prevents you from directly embeding the image to your webapp. To bypass this ristriction the server directly pips the
images response as a BASE64 string which can later be used to display the image on the client without makeing further http calls. Another way to bypass this which
isn't implemented due to ristrictions imposed on my server provider, is to generate the HTML response directy using an anoymous cross orgin while loading the image.
This could make your server handle more reqests as it wont take up much RAM when loading and converting the images response, however it could slow down the loadtime
on the client side or not load at all depending if the domain is blocked.

