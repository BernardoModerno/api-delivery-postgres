const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

/*
* ROTAS
*/
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// console.log('PASSPORT', passport);

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* CHAMANDO AS ROTAS
*/
users(app);

server.listen(3000, '172.24.0.1' || 'localhost', function() {
    console.log('Aplicação de NodeJS ' + port + ' Iniciada...')
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

// 200 - É UMA RESPOSTA EXITOSA
// 404 - SIGNIFICA QUE A URL NÃO EXISTE
// 500 - ERROR INTERNO DO SERVIDOR