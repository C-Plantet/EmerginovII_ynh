import { createRequire } from 'module'
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();
import {zip_Code,unZip_Code} from '../controllers/zip.controller.mjs';


router.post( '/', zip_Code);
router.post( '/unZip', unZip_Code);


export default router;
