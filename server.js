const jsonServer = require('json-server');
const express = require('express');
const port = 3000;
const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
