# titipfile

<div align="center">
  <img src="https://github.com/khouwdevin/titipfile/blob/master/public/logo.png" height="300px"/>
</div>

> titipfile is place to leave and to share files without any trouble and you can self-hosted for your own usage.

> with titipfile you won't bother anyone where you usualy leave the file on group chat and also people don't need to download the file to see the content for supported file such as image, video, audio and pdf.

titipfile currently still in development but you can try it on [dev web](https://titipfilecom.vercel.app/), or you can self-hosted the app with the instruction below.

### Self-hosted

> for self-hosted you need a few steps

- Add .env file

```text
// .env

API_KEY=(key secret => generate it using crypto)
```

- Deploy on your own with docker

> Run this command `docker compose up --build -d`

### Notes

Copy to clipboard needs SSL to be working, you can use certbot to enable the SSL
PRs are welcomed, if you have questions please ask away or if there's any issue please open issue.
