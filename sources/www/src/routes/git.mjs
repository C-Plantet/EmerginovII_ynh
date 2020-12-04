var express = require('express');
var router = express.Router();

import {create_Git_Repository,delete_Git_Repository,pushRepo,pullRepo} from '../controllers/git.controller.mjs';

//http://localhost:3000/repos/create"

router.post   ( '/create' , create_Git_Repository);
router.post  ( '/delete', delete_Git_Repository);
router.post  ( '/push', pushRepo);
router.post  ( '/pull', pullRepo);

export default router;
