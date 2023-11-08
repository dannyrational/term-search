// Replace 'YOUR_IMAGE_URL' with the URL of the image you want to search for.
const imageUrlToFind = 'https://staging-online-jwu-wordpress.educationdynamics.net/wp-content/themes/eddy-minimal/images/online-jwu-placeholder.webp';

// Fetch all posts and pages.
fetch('/wp-json/wp/v2/posts?_embed')
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      // Search for the image URL in the post content.
      if (post.content.rendered.includes(imageUrlToFind)) {
        // Display or record the post where the image is used.
        console.log(`Image found in Post ID: ${post.id}`);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });
