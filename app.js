const express = require('express');
const app = express();
const PORT = 9000
const fs = require('fs')


const info = [
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 1
    },
    {
      "title": "Calculadora",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      "id": 2
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3
    }
]

/*******************************************************************/
//Leer archivo
const pathFile = './productos.txt'
getProducts = async () => {
    try {
        let txt = await fs.promises.readFile(pathFile, 'utf-8')
        let products = JSON.parse(txt)
        return products
    }  catch (error) {
        return {status: "error", message: error.message}
    }
}
/*******************************************************************/
//Definicion de arranque del servidor
const server = app.listen(PORT, () => {
    console.log('Servidor Iniciado')
})
server.on("Error", error => console.log(`Error de servidor ${error}`))
/*******************************************************************/
function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
}
/*******************************************************************/

//GetAllProducts 
app.get('/productos', (req,res) => {
    res.send(info)
})

//GetProductRandom 
app.get('/productoRandom', (req,res)=> {
    res.send((getRandomItem(info)));
})

//GetProducts txt 
app.get('/productos/txt', (req,res) => {
    getProducts().then((prod) => res.send(prod));
})

//GetRandom products
app.get('/productoRandom/txt', (req,res)=> {
    getProducts().then(prod => res.send(getRandomItem(prod)));
})


