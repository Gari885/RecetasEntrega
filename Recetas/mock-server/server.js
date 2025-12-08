const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read DB
const readDB = () => {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// GET /recetas
app.get('/recetas', (req, res) => {
    const recetas = readDB();
    res.json(recetas);
});

// POST /recetas
app.post('/recetas', (req, res) => {
    const recetas = readDB();
    const newReceta = {
        id: Date.now().toString(),
        ...req.body
    };
    recetas.push(newReceta);
    writeDB(recetas);
    res.status(201).json(newReceta);
});

// DELETE /recetas/:id
app.delete('/recetas/:id', (req, res) => {
    let recetas = readDB();
    const id = req.params.id;
    recetas = recetas.filter(r => r.id !== id);
    writeDB(recetas);
    res.status(204).send();
});

// PATCH /recetas/:id (for voting)
app.patch('/recetas/:id', (req, res) => {
    const recetas = readDB();
    const id = req.params.id;
    const index = recetas.findIndex(r => r.id === id);

    if (index !== -1) {
        recetas[index] = { ...recetas[index], ...req.body };
        writeDB(recetas);
        res.json(recetas[index]);
    } else {
        res.status(404).send({ message: 'Receta not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`);
});
