const restify = require('restify');
const routes = require('./routes');
const DBConnector = require('./utils/DBConnector');
const logger = require('morgan');
const port = process.env.PORT || 80;
const app = restify.createServer();

app.use(logger('short'));
app.use(restify.bodyParser());
app.use(restify.queryParser());
app.pre(restify.pre.sanitizePath());

DBConnector();
routes(app);

app.listen(port, () => console.log(`${app.name} listening at port ${port}`));