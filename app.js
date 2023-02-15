const fs = require('fs');

const readCSV = file => new Promise((res, rej) => !file ?
    rej(new Error('CSV-File not found')) :
    fs.readFile(file, 'utf8', (err, data) => err ?
        rej(new Error('Issue in reading the CSV-File')) :
        res(data)));

const menu = {};
let txt = '';
const makeMenu = (data => new Promise((res, rej) => {
    !data || typeof data !== 'string' ?
        rej(new Error('Menu can not be created.')) :
        Object.values(data.split(/\r\n/)).map(txt => txt.split(',')).forEach(meal => !menu[meal[0]] ?
            menu[meal[0]] = [[meal[3].slice(1), meal[1], meal[2]]] :
            menu[meal[0]].push([meal[3].slice(1), meal[1], meal[2]]));

    Object.values(menu).forEach(meal => meal.sort((a, b) => a[1] > b[1] ? 1 : -1));

    Object.keys(menu).forEach(meal => {
        txt += `\n* ${meal.charAt(0).toUpperCase() + meal.slice(1)} Items *\n`;
        menu[meal].forEach(el => txt += `$${(el[0] * 1.8).toFixed(2)} ${el[1]}, ${el[2]}\n`)
    });
    
    res(txt);
    console.log(`\n${data}`);
    console.log(txt + '\n');
}));

const writeTxt = txt => new Promise((res, rej) => !txt || typeof txt !== 'string' ?
    rej(new Error('Issue in reading menu')) :
    res(fs.writeFile('menu.txt', txt, err => err ? console.log(err) : '')));

readCSV('./menu.csv').then(file => (makeMenu(file))).then(txt => writeTxt(txt)).catch(err => console.log(`\n${err}\n`));