var express = require('express');
var router = express.Router();
import {get_And_Save_Code,show_Code,fictive_Save} from '../controllers/save.controller.mjs';


router.post( '/', get_And_Save_Code);
router.post( '/show', show_Code);

router.post( '/fictiveSave', fictive_Save);

export default router;
