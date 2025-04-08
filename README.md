# titipfile

<div align="center">
  <img src="https://github.com/khouwdevin/titipfile/blob/master/public/logo.png" height="300px"/>
</div>

> titipfile is place to leave and to share files without any trouble, usualy storing files for sharing will take up space but with titipfile you don't need to worry because it will clean your space every 24 hours on 00:00 UTC.

> with titipfile you won't bother anyone where you usualy leave the file on group chat and also people don't need to download the file to see the content for supported file such as image, video, audio and pdf.

titipfile currently still in development but you can try it on [dev web](https://titipfilecom.vercel.app/), or you can self-hosted the app with the instruction below.

### Self-hosted

> for self-hosted you need a few steps

> titipfile is using uploadthing as storage provider, in this case you need to create uploadthing account on [uploadthing](https://uploadthing.com)

1. Add .env file

```text
// .env

UPLOADTHING_TOKEN=(uploadthing token)
UPLOADTHING_SECRET=(uploadthing secret)
UPLOADTHING_URL=(uploadthing url)
CRON_SECRET=(cron secret => generate it using crypto)
MAX_FILE_SIZE=(in MB, default 100MB)
```

2. Add the cron secret to vercel or other provider if needed

3. Host your web on server provider or deploy on your own

### Notes

PRs are welcomed, if you have questions please ask away or if there's any issue please open issue.
