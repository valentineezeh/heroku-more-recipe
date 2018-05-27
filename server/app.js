// bringing in dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors'
// import config from '../webpack.config.js';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackDevMiddleware from 'webpack-hot-middleware';

import router from './routes/index';


const app = express();
//const compiler = webpack(config);

//app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
//app.use(webpackHotMiddleware(compiler))
app.use(express.static('./client'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// connect all routes to application


app.use(cors())

app.use('/', router);

const port = +process.env.PORT || 8009;
app.set('port', port);

// Turn on the server

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
