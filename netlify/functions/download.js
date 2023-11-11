// functions/download.js

const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const { Readable } = require('stream');

exports.handler = async function (event, context) {
  try {
    const { youtubeLink } = event.queryStringParameters;

    if (!youtubeLink) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'YouTube link is required.' }),
      };
    }

    // Validate YouTube link (you might want to add more validation)
    if (!ytdl.validateURL(youtubeLink)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid YouTube link.' }),
      };
    }

    // Get video information
    const videoInfo = await ytdl.getInfo(youtubeLink);

    // Get the highest quality video stream
    const videoStream = ytdl(youtubeLink, { quality: 'highestvideo' });

    // Convert video stream to a buffer
    const videoBuffer = await streamToBuffer(videoStream);

    return {
      statusCode: 200,
      body: JSON.stringify({ videoBuffer, videoInfo }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// Utility function to convert a stream to a buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error) => reject(error));
  });
}

