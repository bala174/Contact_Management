const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const upload = multer({dest:'uploads/'});

const getfunction = require('./db');

app.post('/api/signup',getfunction.insertUser);
app.post('/api/login',getfunction.checkUser);
app.post('/api/getContact',getfunction.getContact);
app.post('/api/addContact',upload.single('photo'),getfunction.addContact);
app.post('/api/deleteContact',getfunction.deleteContact);
app.post('/api/editContact',getfunction.editContact);

app.listen(5000, () => {
    console.log('server listening at 5000 ...');
});
