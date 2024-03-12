If you want to organize your code by storing HTML blocks in separate files and then including them in your main HTML page, you can achieve this using server-side includes (SSI), JavaScript, or other templating systems. However, if you're working with just HTML and JavaScript, one way to do this is by using JavaScript to fetch HTML content from separate files and then insert them into your main HTML page dynamically.

Here's a basic example of how you can achieve this:

1-Create separate HTML files for your blocks: For example, you can have productBlock1.html, productBlock2.html, etc., each containing the HTML structure for a specific product block.

2-Main HTML page: Create an HTML page where you want to display these blocks. Let's call it index.html.

3-JavaScript to fetch and insert HTML blocks:

<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Blocks</title>
</head>
<body>
    <div id="products-container">
        <!-- Product blocks will be inserted here -->
    </div>

    <script>
        // Function to fetch HTML content from a file
        function fetchHTML(url, callback) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    callback(html);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }

        // Function to insert HTML content into the page
        function insertHTML(containerId, html) {
            document.getElementById(containerId).innerHTML = html;
        }

        // Fetch and insert product blocks
        fetchHTML('productBlock1.html', html => {
            insertHTML('products-container', html);
        });

        fetchHTML('productBlock2.html', html => {
            insertHTML('products-container', html);
        });

        // Add more fetchHTML calls for other blocks if needed
    </script>

</body>
</html>

<!-- productBlock1.html -->

<div class="product">
    <h2>Product 1</h2>
    <p>Description for Product 1</p>
</div>

<!-- productBlock2.html -->

<div class="product">
    <h2>Product 2</h2>
    <p>Description for Product 2</p>
</div>
