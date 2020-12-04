var express = require('express');
var router = express.Router();
import {sendEmail} from '../controllers/mail.controller.mjs';


router.post ( '/send' , sendEmail);

export default router;
