import { Router } from 'express';

const router = Router();
import {sendEmail} from '../controllers/mail.controller';


router.post ( '/send' , sendEmail);

export default router;
