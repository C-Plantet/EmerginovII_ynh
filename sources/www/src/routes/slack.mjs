import { createRequire } from 'module'
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();
import {getLastMessage,putMessage} from '../controllers/slack.controller.mjs';


router.post('/' , getLastMessage);
router.post('/send' , putMessage);

//router.post  ( '/delete', delete_Git_Repository);

export default router;
