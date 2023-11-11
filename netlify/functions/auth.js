// netlify/functions/auth.js

exports.handler = async function({ body }, context) {
  try {
    // Parse the incoming data from the client
    const { googleId, displayName, email } = JSON.parse(body);

    // Perform server-side logic (e.g., store data in a database)

    // Respond with a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data received and processed successfully' }),
    };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
