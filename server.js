const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());


/*Haetaan tuotteet */
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


/*Haetaan käyttäjät */
app.get('/api/users', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const users = JSON.parse(data);
    console.log(data)
    res.json(users);
  });
});


/*Lisätään tuote */
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

/*Haetaan käyttäjä nimellä */
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

/*Haetaan käyttäjän rahat */
app.get('/api/users/:name/money', (req, res) => {
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
    res.json(user.money);
  });
});

/* Lisätään käyttäjä */
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


/* Lisätään käyttäjän historiaan tuote */
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

/*Haetaan tuotteiden id*/
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

/*Poistetaan tuote*/
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

/*Lisätään tuote*/
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

/*Päivitetään käyttäjän rahat*/
app.put('/api/users/:userName', (req, res) => {
  const userName = req.params.userName;
  const userMoney = req.body.money;
  console.log("userMoney:", userMoney);
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    const db = JSON.parse(data);
    const users = db.users;
    const user = users.find(u => u.name === userName);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    user.money = userMoney;
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.send('User money updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});