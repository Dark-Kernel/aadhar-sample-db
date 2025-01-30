const express = require('express');
const cors = require('cors');

const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3002, () => {
    console.log('Example app listening on port 3000!')
})

app.get('/api', (req, res) => {
    biometric_hash = req.query.biometric_hash
    data = fs.readFileSync('./sample_biometric_data.json', 'utf-8');
    biometric_data = JSON.parse(data)
    for (let i = 0; i < biometric_data.length; i++) {
        if (biometric_data[i].biometric_hash == biometric_hash) {
            res.send(biometric_data[i])
            return
        }
    }
    res.send({ error: "Invalid biometric hash" })
})

app.get('/api/:biometric_hash', (req, res) => {
    biometric_hash = req.params.biometric_hash
    data = fs.readFileSync('./sample_biometric_data.json', 'utf-8');
    biometric_data = JSON.parse(data)
    for (let i = 0; i < biometric_data.length; i++) {
        if (biometric_data[i].biometric_hash == biometric_hash) {
            res.send(biometric_data[i])
            return
        }
    }
    res.send({ error: "Invalid biometric hash" })
})

app.get('/lists', (req, res) => {
    data = fs.readFileSync('./sample_biometric_data.json', 'utf-8');
    biometric_data = JSON.parse(data)
    biometric_hashes = biometric_data.map(biometric_data => biometric_data.biometric_hash)
    res.send(biometric_hashes)
})

app.get('/random', (req, res) => {
    data = fs.readFileSync('./sample_biometric_data.json', 'utf-8');
    biometric_data = JSON.parse(data)
    res.send(biometric_data[Math.floor(Math.random() * biometric_data.length)])
})
