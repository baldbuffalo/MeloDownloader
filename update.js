// Update the URL with your Netlify site and function name
const authEndpoint = 'https://melodownloader.netlify.app/.netlify/functions/auth';

// Perform Google Sign-In and send user data to the serverless function
// ...

// Example using fetch
fetch(authEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ googleId, displayName, email }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
