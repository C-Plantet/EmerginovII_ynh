import { createRequire } from 'module'
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();
import {get_And_Execute_PhpCode} from '../controllers/php.controller.mjs';

router.post( '/', get_And_Execute_PhpCode);



export default router;
