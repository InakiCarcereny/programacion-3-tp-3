const { Router } = require('express');
const router = Router();

// Endpoint temporal para que no crashee
router.get('/', (req, res) => {
    res.json({ msg: 'Ruta funcionando' });
});

// ¡ESTA ES LA LÍNEA QUE FALTA!
module.exports = router;