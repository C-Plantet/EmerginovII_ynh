import {Router} from 'express';
const router = Router();

import {getLastMessage,putMessage} from '../controllers/slack.controller.js';


router.post('/' , getLastMessage);
router.post('/send' , putMessage);

//router.post  ( '/delete', delete_Git_Repository);

export default router;
