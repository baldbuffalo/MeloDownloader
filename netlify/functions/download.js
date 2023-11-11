<script>
    document.getElementById('downloadButton').addEventListener('click', function() {
        // Get the YouTube link from the input
        var youtubeLink = document.getElementById('youtubeLink').value;

        // Construct the download link (replace 'your-netlify-site' with your actual Netlify site name)
        var downloadLink = 'https://your-netlify-site.netlify.app/.netlify/functions/download?youtubeLink=' + encodeURIComponent(youtubeLink);

        // Use fetch to initiate the download
        fetch(downloadLink, { method: 'GET' })
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary link and trigger the download
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'video.mp4'; // You can set the desired filename here
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error initiating download:', error);
            });
    });
</script>
