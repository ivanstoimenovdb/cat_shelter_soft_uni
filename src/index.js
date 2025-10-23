import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    // if (req.url === '/') {

    //     const homeHtml = await fs.readFile("./src/views/home/index.html", { encoding: 'utf-8'});

    //     res.writeHead(200, {
    //         "content-type": 'text/html',
    //     })

    //     res.write(homeHtml);
    // }else if (req.url === '/styles/site.css') {
    //     res.writeHead(200, {
    //         "content-type": "text/css",
    //     })

    //     const siteCss = await fs.readFile("./src/styles/site.css");

    //     res.write(siteCss);

    // }
    let content;
    switch (req.url) {
        case '/':
            content = await homeView();
            break;
        case '/cats/add-breed':
            content = await addBreedView();
            break;
        case '/cats/add-cat':
            content = await addAddCatView();
            break;
        case '/styles/site.css':
            const siteCss = await fs.readFile("./src/styles/site.css", { encoding: 'utf-8' });

            res.writeHead(200, {
                "content-type": 'text/css',
            })

            res.write(siteCss);
            return res.end();
        default:
            return res.end();
    }
    res.writeHead(200, {
        'content-type': 'text/html',
    })

    res.write(content);

    res.end();
})

async function readFile(path) {
    return await fs.readFile(path, { encoding: 'utf-8' });
}

async function homeView() {
    return await readFile("./src/views/home/index.html");
}

async function addBreedView() {
    return await readFile("./src/views/addBreed.html");
}

async function addAddCatView() {
    return await readFile("./src/views/addCat.html");;
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');


