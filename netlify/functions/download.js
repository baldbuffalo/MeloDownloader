// netlify/functions/download.js

const ytdl = require('ytdl-core');

exports.handler = async function(event, context) {
  try {
    const { youtubeLink } = JSON.parse(event.body);

    // Validate YouTube link
    if (!ytdl.validateURL(youtubeLink)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid YouTube link' }),
      };
    }

    // Download the YouTube video
    const videoInfo = await ytdl.getInfo(youtubeLink);
    const videoStream = ytdl(youtubeLink, { format: 'mp4' });

    // Set up response headers
    const headers = {
      'Content-Disposition': `attachment; filename="${videoInfo.title}.mp4"`,
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
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
