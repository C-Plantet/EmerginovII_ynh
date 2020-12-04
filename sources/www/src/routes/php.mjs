import { Router } from 'express';

const router = Router();
import {get_And_Execute_PhpCode} from '../controllers/php.controller.mjs';

router.post( '/', get_And_Execute_PhpCode);



export default router;
