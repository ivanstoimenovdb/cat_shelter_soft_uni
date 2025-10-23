import http from 'http';
import home from './home.html.js';
import style from './style.css.js';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            "content-type": 'text/html',
        })

        res.write(home);
    } else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            "content-type": "text/css",
        })

        res.write(style);
    }

    res.end();
})

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');


