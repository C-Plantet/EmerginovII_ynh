import {Router} from 'express';
const router = Router();

import {zip_Code,unZip_Code} from '../controllers/zip.controller.js';


router.post( '/', zip_Code);
router.post( '/unZip', unZip_Code);


export default router;
