const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const url = 'https://rickandmortyapi.com/api/character';

app.use(cors());



app.get('/characters', async (req, res)=>{    
    try {
        const response = await axios.get(url)
        res.json(response.data);

    } catch (error) {
        res.status(404).json({error: 'petición erronea'})
    }
})

app.get('/characters/:name', async (req, res)=>{
    const name = req.params.name;
    const urlName = url + '/?name='+name;
   
    try {
        const response = await axios.get(urlName);
        res.json(response.data);       
    } catch (error) {
        res.status(404).json({error: 'personaje no encontrado'})
    }
})

app.listen(3000, ()=>{
    console.log('express en http://localhost:3000');
})