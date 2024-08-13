const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(serve(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});