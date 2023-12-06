const axios = require('axios');
const fs = require('fs');
const PDFDocument = require('pdfkit');

let count = 1;
const searchTerms = ['MBA, Doctorate'];
const resultsPerPage = 100;
const totalPages = 1;
const postType = 'posts';
const publicSiteURL = 'https://test.com';

const filteredData = [];

const doc = new PDFDocument();

function fetchAndFilterPosts(page) {
    const siteUrl = `${publicSiteURL}/wp-json/wp/v2/${postType}?per_page=${resultsPerPage}&page=${page}`;

    axios
        .get(siteUrl)
        .then(response => {
            const posts = response.data;

            for (const post of posts) {
                for (const term of searchTerms) {

                    if (JSON.stringify(post).includes(term)) {
                        
                        filteredData.push({
                            title: post.title.rendered,
                            link: post.link,
                            page,
                            term,
                        });
                    }
                }
            }

            if (page < totalPages) {
                fetchAndFilterPosts(page + 1);
            } else {
                // Write the matching posts to a JSON file when done fetching
                fs.writeFileSync('search-results.json', JSON.stringify(filteredData, null, 2));
                
                // Save the matching posts as a PDF file when done fetching
                // doc.pipe(fs.createWriteStream('./results/search-results.pdf'));
                // doc.text(JSON.stringify(filteredData, null, 2));
                // doc.end();
                
                console.log('Done!');
            }
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

fetchAndFilterPosts(count);
