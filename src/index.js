import http from 'http';
import siteCss from './style.css.js';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {

        const homeHtml = await fs.readFile("./src/views/home/index.html", { encoding: 'utf-8'});

        res.writeHead(200, {
            "content-type": 'text/html',
        })

        res.write(homeHtml);
    }else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            "content-type": "text/css",
        })

        res.write(siteCss);

    }

    res.end();
})

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');


