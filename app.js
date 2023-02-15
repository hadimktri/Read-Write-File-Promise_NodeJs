
const readCSV = file => new Promise((res, rej) => !file ? rej(new Error('CSV-File not found')) :
    fs.readFile(file, 'utf8', (err, data) => err ? rej(new Error('Issue in reading the CSV-File')) : res(data)));

const writeTxt = data => new Promise((res, rej) => !data || typeof data !== 'string' ? rej(new Error('Issue in reading menu')) :
    res(fs.writeFile('menu.txt', data, err => err ? console.log(err) : '')));

const makeMenu = (text => new Promise((res, rej) => {
    !text || typeof text !== 'string' ? rej(new Error('Menu can not be created.')) : console.log(`\n${text}\n`);

    const menu = [];
    Object.values(text.split(/\r\n/)).map(txt => txt.split(',')).forEach(meal => !menu[meal[0]] ?
        menu[meal[0]] = [[meal[3].slice(1), meal[1], meal[2]]] : menu[meal[0]].push([meal[3].slice(1), meal[1], meal[2]]));
        
    Object.values(menu).forEach(meal => meal.sort((x, y) => x[1] > y[1] ? 1 : -1));

    let txt = '';
    Object.keys(menu).forEach(meal => {
        txt += `\n* ${meal.charAt(0).toUpperCase() + meal.slice(1)} Items *\n`;
        menu[meal].forEach(el => txt += `$${(el[0] * 1.8).toFixed(2)} ${el[1]}, ${el[2]}\n`);
    })
    console.log(txt + '\n');
    res(txt);
}));
readCSV('./menu.csv').then(file => (makeMenu(file))).then(txt => writeTxt(txt)).catch(err => console.log(`\n${err}\n`));