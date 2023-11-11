const ytdl = require('ytdl-core');

exports.handler = async function (event, context) {
  const youtubeLink = event.queryStringParameters.youtubeLink;

  try {
    // Use ytdl-core to get the video stream
    const videoInfo = await ytdl.getInfo(youtubeLink);
    const videoStream = ytdl(youtubeLink, { quality: 'highestvideo' });

    // Set headers for video download
    const headers = {
      'Content-Disposition': `attachment; filename="${videoInfo.videoDetails.title}.mp4"`,
      'Content-Type': 'video/mp4',
    };

    return {
      statusCode: 200,
      headers,
      body: videoStream,
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error downloading the video' }),
    };
  }
};
