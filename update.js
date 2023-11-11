// Update the URL with your Netlify site and function name
const authEndpoint = '/.netlify/functions/download';

// Perform YouTube video download
async function downloadVideo() {
  const youtubeLink = document.getElementById('youtubeLink').value;

  try {
    const response = await fetch(`${authEndpoint}?youtubeLink=${encodeURIComponent(youtubeLink)}`);
    const data = await response.json();

    // Handle the response data (e.g., display video info)
    console.log(data);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed. Please check the YouTube link.');
  }
}
