import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import session from "./controllers/user.controller.mjs"
const app=express();
app.use(express.json());
const TWO_HOURS=1000*60*60*2;
const  {
  port=3000,
  SESS_NAME='sid',
  SESS_SECRET='ssh!quiet,it\'asecret!',
  NODE_ENV='development',
  SESS_LIFETIME=TWO_HOURS

}=process.env

const IN_PROD=NODE_ENV=='production'
console.log(session);

//Importing routes
import gitRoutes from './routes/git.mjs'
import projectRoutes from './routes/projects.mjs';
import usersRoutes from './routes/users.mjs';
import homeRoutes from './routes/home.mjs';
import phpRoutes from './routes/php.mjs';
import saveRoutes from './routes/save.mjs';
import slackRoutes from './routes/slack.mjs';
import smsRoutes from './routes/sms.mjs';
import mailRoutes from './routes/mail.mjs';
import mastodonRoutes from './routes/mastodon.mjs';
import zipRoutes from './routes/zip.mjs';

//middlewares
import  { storage1 } from './controllers/user.controller.mjs'

app.use(morgan('dev'));

// support parsing of application/json type post data
app.use(bodyParser.json({limit: '50mb', extended: true}));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/public'));

//routes
app.use('/my_webapp_node/api/projects',projectRoutes);
app.use('/my_webapp_node/api/users',usersRoutes);
app.use('/my_webapp_node/api/users/login',usersRoutes);
app.use('/my_webapp_node/home',homeRoutes);
app.use('/my_webapp_node/php',phpRoutes);
app.use('/my_webapp_node/save',saveRoutes);
app.use('/my_webapp_node/repos',gitRoutes);
app.use('/my_webapp_node/slack',slackRoutes);
app.use('/my_webapp_node/sms',smsRoutes);
app.use('/my_webapp_node/mail',mailRoutes);
app.use('/my_webapp_node/mastodon',mastodonRoutes);
app.use('/my_webapp_node/zip',zipRoutes);



export default app;
