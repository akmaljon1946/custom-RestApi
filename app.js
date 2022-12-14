const express = require("express");
const path = require("path");
const app = express();
const { v4 } = require('uuid');

let CONTACTS = [
  { id: v4(), name: 'Akmaljon', value: '+998906707777', title: 'jsDeveloper', marked: false }
];

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);

  }, 1500);
});

//POST
app.post('/api/contacts', (req, res) => {
  const contact = { id: v4(), ...req.body, marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);

});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
  res.status(200).json({ message: 'Malumot ochirib tashlandi' });
});

//PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx]);
});







app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
app.listen(3000, () => console.log("Server has been started on port 3000..."));