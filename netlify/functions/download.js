const { createServer } = require('http');
const { parse } = require('url');
const ytdl = require('ytdl-core');

const server = createServer((req, res) => {
  const { query } = parse(req.url, true);
  const youtubeLink = query.youtubeLink;

  ytdl.getInfo(youtubeLink, (err, info) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error downloading the video');
    } else {
      res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
      res.setHeader('Content-Type', 'video/mp4');
      ytdl(youtubeLink, { format: 'mp4' }).pipe(res);
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
