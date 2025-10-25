import http from 'http';
import fs from 'fs/promises';
import * as model from './data.js'


const server = http.createServer(async (req, res) => {
    let content;
    
    if(req.method === 'POST'){
        console.log('Post method execution....');
        let data = '';
        req.on('data', (chunk) =>{
            data += chunk.toString();
        })

        req.on('end', async () => {
            const searchParams = new URLSearchParams(data);

            const newCat = Object.fromEntries(searchParams.entries());

            await model.saveCat(newCat);

            // TODO Redirect to home page.
           res.writeHead(302, {
            'location' : '/'
           }
           ) ;

          res.end();
        });
         return;
    }

    
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
    const content = await readFile("./src/views/home/index.html");
    
    const cats = await model.getCats();
    let catsHtml = ''
    if(cats.length > 0){
        catsHtml = cats.map(cat => templateCat(cat)).join('\n');
    }else{
        catsHtml = `<spnam>There are no cats to be shown</span>`;
    }
    const result = content.replace('{{cats}}', catsHtml);
    return result;
}

async function addBreedView() {
    return await readFile("./src/views/addBreed.html");
}

async function addAddCatView() {
    return await readFile("./src/views/addCat.html");;
}

function templateCat(cat) {
    return `
    <li>
                    <img src=${cat.imageUrl} alt=${cat.name}>
                    <h3></h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="">Change Info</a></li>
                        <li class="btn delete"><a href="">New Home</a></li>
                    </ul>
                </li>
    `
}

server.listen(5000);

console.log('Server is listening on http://localhost:5000...');


