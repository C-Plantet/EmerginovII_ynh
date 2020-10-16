import { Router } from 'express';

const router = Router();
import {sendSMS} from '../controllers/sms.controller';


router.post   ( '/send' , sendSMS);

export default router;
