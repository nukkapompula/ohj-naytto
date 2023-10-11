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

app.get('/api/users', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const users = JSON.parse(data);
    res.json(users);
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
    newItem.id = items.items.length + 1;
    items.items.push(newItem);
    fs.writeFile('db.json', JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).json(newItem);
    });
  });
});

app.get('/api/users/:name', (req, res) => {
  const name = req.params.name;
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const users = JSON.parse(data).users;
    const user = users.find(u => u.name === name);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  });
});

app.post('/api/users', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const users = JSON.parse(data).users;
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    fs.writeFile('db.json', JSON.stringify({ items: [], users }, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).json(newUser);
    });
  });
});

app.post('/api/users/:name/history', (req, res) => {
  const name = req.params.name;
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const db = JSON.parse(data);
    const user = db.users.find(u => u.name === name);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const newItem = req.body;
    newItem.id = user.history.length + 1;
    user.history.push(newItem);
    fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).json(newItem);
    });
  });
});

app.get('/api/items/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      const items = JSON.parse(data);
      const item = items.items.find(item => item.id == id);
      if (!item) {
        res.status(404).send('Item not found');
        return;
      }
      res.json(item);
    });
});

app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const items = JSON.parse(data);
    const item = items.items.find(item => item.id == id);
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    items.items = items.items.filter(item => item.id != id);
    fs.writeFile('db.json', JSON.stringify(items), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.json(item);
    });
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
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});