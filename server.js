const express = require('express');
const cors = require('cors');
const items = require('./data/products');
console.log("Loaded items:", items);


const app = express();
app.use(cors());
app.use(express.json());

let index = 0;

app.get('/item', (req, res) => {
    res.json({ index, item: items[index], total: items.length });
});

app.get('/item/next', (req, res) => {
    index = (index + 1) % items.length;
    res.json({ index, item: items[index], total: items.length });
});

app.get('/item/prev', (req, res) => {
    index = (index - 1 + items.length) % items.length;
    res.json({ index, item: items[index], total: items.length });
});

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id < 0 || id >= items.length) {
        return res.status(404).json({ error: 'Not found' });
    }
    index = id;
    res.json({ index, item: items[index], total: items.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
