import { Router } from 'express';

const router = Router();
import {sendSMS} from '../controllers/sms.controller.mjs';


router.post   ( '/send' , sendSMS);

export default router;
