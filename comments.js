// Create web server
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let url = req.url;
    if (url === '/favicon.ico') {
        res.end();
        return;
    }
    if (url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.end('Error');
            } else {
                res.end(data);
            }
        });
    } else if (url === '/comments') {
        fs.readFile('./comments.json', (err, data) => {
            if (err) {
                res.end('Error');
            } else {
                res.end(data);
            }
        });
    } else {
        res.end('Error');
    }
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Path: index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <ul id="comments">
    </ul>
    <script>
        fetch('/comments')
            .then(response => response.json())
            .then(comments => {
                const commentsList = document.getElementById('comments');
                comments.forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = comment;
                    commentsList.appendChild(li);
                });
            });
    </script>
</body>
</html>

// Path: comments.json
[
    "Comment 1",
    "Comment 2",
    "Comment 3"
]