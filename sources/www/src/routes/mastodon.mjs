var express = require('express');
var router = express.Router();
import {putMessage} from '../controllers/mastodon.controller.mjs';


router.post('/send' , putMessage);

//router.get  ( '/get', newMessage);

export default router;
