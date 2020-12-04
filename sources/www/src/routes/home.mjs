import {Router} from 'express';
const router = Router();

import {getFile,create_DirectoryOrFile,update_DirectoryOrFile,delete_DirectoryOrFile} from '../controllers/file.controller.js';


router.post   ( '/editor' , getFile);
router.post   ( '/project', create_DirectoryOrFile);
router.put   ( '/project', update_DirectoryOrFile);
router.delete( '/project', delete_DirectoryOrFile);

export default router;
