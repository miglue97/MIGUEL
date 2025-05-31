const express = require('express'); 
const cors = require('cors');
const app = express();

// settings (configurar el servidor)
app.set('port', process.env.PORT || 4000);


// middlewares (poder definir funciones que se ejecuten antes de que llegue a las rutas)
app.use(cors());
app.use(express.json());

// routes 
app.use('/api/users',require('./routes/users'));
app.use('/api/notes',require('./routes/notes'));


module.exports = app; 