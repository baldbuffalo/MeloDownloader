const express = require('express');
const app = express();
const ytdl = require('ytdl-core');

app.get('/download', async (req, res) => {
  const youtubeLink = req.query.youtubeLink;

  try {
    // Use ytdl-core to get the video stream
    const videoInfo = await ytdl.getInfo(youtubeLink);
    const videoStream = ytdl(youtubeLink, { quality: 'highestvideo' });

    // Set headers for video download
    res.header('Content-Disposition', `attachment; filename="${videoInfo.videoDetails.title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    // Pipe the video stream to the response
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading the video');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
