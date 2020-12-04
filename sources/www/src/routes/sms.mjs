import {Router} from 'express';
const router = Router();

import {sendSMS} from '../controllers/sms.controller.js';


router.post   ( '/send' , sendSMS);

export default router;
