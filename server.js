const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/download', async (req, res) => {
  const youtubeLink = req.query.youtubeLink;

  try {
    const videoInfo = await ytdl.getInfo(youtubeLink);
    const videoStream = ytdl(youtubeLink, { quality: 'highestvideo' });

    res.header('Content-Disposition', `attachment; filename="${videoInfo.videoDetails.title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    videoStream.pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading the video');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
