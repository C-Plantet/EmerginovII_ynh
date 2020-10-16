import { Router } from 'express';

const router = Router();

import { createProject, getProjects,getProjectById,deleteProject,updateProject,getProjectByUserId,deleteProjectFromAllTables,getProjectByName,verifyRequest,sendReq} from '../controllers/project.controller';

// /api/projects/
router.post('/',createProject);
router.get('/', getProjects);
// /api/projects/:projectId
router.post('/id',getProjectById);
router.post('/name',getProjectByName);
router.post('/sendReq',sendReq);
router.post('/verifyRequest',verifyRequest);
router.post('/deleteAll',deleteProjectFromAllTables);

router.get('/users/:UserId',getProjectByUserId);
router.delete('/:id',deleteProject);
router.put('/:id',updateProject);
export default router;
