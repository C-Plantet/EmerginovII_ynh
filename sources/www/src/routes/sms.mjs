var express = require('express');
var router = express.Router();
import {sendSMS} from '../controllers/sms.controller.mjs';


router.post   ( '/send' , sendSMS);

export default router;
