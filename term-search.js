const axios = require('axios');
const fs = require('fs');
const PDFDocument = require('pdfkit');

let count = 1;
const searchTerms = [
    'MBA Executive Communication',
    'MBA Global Fashion Merchandising Management',
    'MBA Information Security/Assurance',
    'MBA Nonprofit Management',
    'MBA Project Management',
    'MPA Criminal Justice',
    'MPA Homeland Security',
    'MPA Human Resource Management',
    'MPA Nonprofit Management',
    'MS Global Tourism and Sustainable Economic Development',
    'MS Human Resource Management',
    'MS Instructional Design & Technology',
    'MS International Beverage Management',
    'MS Nonprofit Management',
    'Gradate Certificate in Artificial Intelligence and Computer Vision',
    'Graduate Certificate in Nonprofit Management',
    'Micro-Certificate in Executive Communication',
    'Micro-Certificate in Instructional Design',
    'Communication',
    'Sociology',
    'Advertising & Marketing Communications',
    'BS Beverage Sales & Marketing Management',
    'BS Hotel and Resort Management',
    'BS Political Science',
    'BS Tourism & Hospitality Management',
    'BSBA Enterprise Risk Management',
    'BSBA International Business',
    'BSBA Leadership Studies',
    'BSBA Management',
    'Professional Craft Brewing - Certificate',
    'Micro-Certificate in Communication for Change',
    'Micro-Certificate in Public Health',
    'Political Science',
];
const resultsPerPage = 100;
const totalPages = 6;
const postType = 'posts';

const filteredData = [];

const doc = new PDFDocument();

function fetchAndFilterPosts(page) {
    const siteUrl = `https://online.jwu.edu/wp-json/wp/v2/${postType}?per_page=${resultsPerPage}&page=${page}`;

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
                fs.writeFileSync('program_search-blogs_results.json', JSON.stringify(filteredData, null, 2));
                
                // Save the matching posts as a PDF file when done fetching
                // doc.pipe(fs.createWriteStream('./results/term-search-results_posts_final.pdf'));
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
