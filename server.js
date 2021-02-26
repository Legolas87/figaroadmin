const express = require('express');
const next = require('next');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('./config/i18n');

app.prepare()
  .then(() => {
    const server = express();

    // enable middleware for i18next
    server.use(nextI18NextMiddleware(nextI18next));

    // serve locales for client
    server.use('/locales', express.static(path.join(__dirname, '/locales')));

    server.get('/home', (req, res) => app.render(req, res, '/home', req.query));

    server.get('/courses', (req, res) => app.render(req, res, '/courses', req.query));

    server.get('/partnerlist', (req, res) => app.render(req, res, '/partnerlist', req.query));
    server.get('/feedback', (req, res) => app.render(req, res, '/feedback', req.query));
    server.get('/notification', (req, res) => app.render(req, res, '/notification', req.query));
    server.get('/', (req, res) => app.render(req, res, '/signin', req.query));
    server.get('/allorders', (req, res) => app.render(req, res, '/allorders', req.query));
    server.get('/orders/:partnername?/:branchname?', (req, res) => app.render(req, res, '/orders', { partnername: req.params.partnername, branchname: req.params.branchname }));
    server.get('/pays/:partnername?/:branchname?', (req, res) => app.render(req, res, '/pays', { partnername: req.params.partnername, branchname: req.params.branchname }));
    server.get('/menu/:id/:lang/:branchname/:partnername/:categoryname?/:cat?', (req, res) => app.render(req, res, '/menu', { id: req.params.id, lang: req.params.lang,branchname: req.params.branchname, partnername: req.params.partnername, categoryname: req.params.categoryname, cat: req.params.cat }));
    server.get('/menu/tables/:id/:lang', (req, res) => app.render(req, res, '/branchtables', { id: req.params.id, lang: req.params.lang }));
    server.get('*', (req, res) => handle(req, res));


    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
