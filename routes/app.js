const express = require('express');
const router = express.Router();
const joyas = require('../data/joyas.js').results;
//const app = require('../server.js');
const PORT = 3000;

//app.listen(PORT, () => console.log('Your app listening on port ${PORT}'));


//(Requerimiento 1)
// Ruta GET /joyas 
router.get('/', (req, res) => {
    const { page = 1, limit = 10, sort, campo, valor } = req.query;
    const pageInt = parseInt(page);
    const limitInit = parseInt(limit);

    let joyasFiltradas = [...joyas];

  //(Requerimiento 3)
  // Filtrado por campos 
    if (campo && valor) {
        joyasFiltradas = joyasFiltradas.filter((j) => j[campo] == valor);
    }
//(Requerimiento 6)
// Ordenamiento 
    if (sort) {
        joyasFiltradas.sort((a, b) => (sort === 'asc' ? a.value - b.value : b.value - a.value));
    }

    //(Requerimiento 5)
    // Paginación 
    const startIndex = (page - 1) * limitInit;
    const endIndex = pageInt * limitInit;
    const joyasPaginadas = joyasFiltradas.slice(startIndex, endIndex);

    const HATEOAS = joyasPaginadas.map((j) => ({
    id: j.id,
    name: j.name,
    href: `http://localhost:${PORT}/joyas/${j.id}`,
}));

    res.json({ total: joyasFiltradas.length, joyas: HATEOAS });
});

//(Requerimiento 2)
// Ruta GET /joyas/categoria/:categoria 
router.get('/categoria/:categoria', (req, res) => {
    const { categoria } = req.params;
    const joyasFiltradas = joyas.filter((j) => j.category === categoria);

    if (joyasFiltradas.length === 0) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(joyasFiltradas);
    });

//(Requerimiento 4)
// Ruta GET /joyas/:id 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const joya = joyas.find((j) => j.id === parseInt(id));

    if (!joya) {
        return res.status(404).json({ error: 'Joya no encontrada' });
    }

    res.json(joya);
    });

module.exports = router;
