const express = require('express');
//const joyas = require('./data/joyas.js') -> se incorpora a app.js
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log('Your app listening on port ${PORT}'));

//Ruta Principal
app.get('/', (req, res) => {
  res.send('Oh wow! this is working =)')
});

//Importar y usar rutas

const joyasRoutes = require ('./routes/app.js');
app.use('/joyas', joyasRoutes);

module.exports = app;//PORT