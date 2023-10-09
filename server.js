const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/api/items', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const items = JSON.parse(data);
    res.json(items);
  });
});

app.post('/api/items', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const items = JSON.parse(data);
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    fs.writeFile('db.json', JSON.stringify(items), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).json(newItem);
      console.log(`Added new item: ${newItem}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});