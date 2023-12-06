# WordPress Search and Filter Tool

## Overview

This script is a Node.js application designed to fetch and filter WordPress posts based on specified search terms. The filtered posts are then saved as both a JSON file and a PDF document.

## Dependencies

- **axios**: A promise-based HTTP client for the browser and Node.js.
- **fs**: The Node.js file system module, used for file operations.
- **PDFKit**: A PDF generation library for Node.js.

## Usage

1. Install the required dependencies:

    `npm install axios fs pdfkit`

2. Configure the script by modifying the following variables in the code:

    - `searchTerms`: An array of search terms to filter posts.
    - `resultsPerPage`: Number of results to fetch per API request.
    - `totalPages`: Total number of pages to fetch.
    - `postType`: Type of WordPress posts to fetch (e.g., 'posts').
    - `publicSiteURL`: The base URL of the WordPress site's public API.

3. Run the script:

    `node script.js`

4. The script will fetch and filter posts, saving the results in a JSON file (`search-results.json`) and optionally as a PDF document.

## Important Notes

- Make sure to update the `searchTerms`, `resultsPerPage`, `totalPages`, `postType`, and `publicSiteURL` variables according to your requirements.
- Uncomment the PDF generation section in the code if you want to save the matching posts as a PDF document.

## License

This script is licensed under the [MIT License](LICENSE).
