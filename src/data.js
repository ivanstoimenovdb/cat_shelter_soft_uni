import fs from 'fs/promises';

const dbSerialized = await fs.readFile('./src/db.json');
const db = JSON.parse(dbSerialized);

export async function getCats(){

    return db.cats;
}

export async function  saveCat(cat) {
    // add cat to cats array;
    db.cats.push(cat);

    // Serialize db;
    const dbSerialized = JSON.stringify(db, null, 2);

    // Save cats array to filesystem;
    await fs.writeFile('./src/db.json', dbSerialized, {encoding : 'utf-8'});
    
}