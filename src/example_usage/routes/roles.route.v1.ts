import { auth } from '@modules/auth';
import { validate } from '@modules/validate';
import express, { Router } from 'express';
import { rolesController, rolesValidation } from '..';
import { allPermissions } from '../../../setting/roles';
import { assignRole } from '../validate/validation.roles';

const router: Router = express.Router();
router
  .route('/roles')
  .post(auth(allPermissions.Roles.Create), validate(rolesValidation.createRole), rolesController.createRoleController)
  .get(auth(allPermissions.Roles.GetAll), validate(rolesValidation.getRoles), rolesController.getAllRolesController);
router
  .route('/roles/:roleId')
  .get(auth(allPermissions.Roles.Get), validate(rolesValidation.getRole), rolesController.getRoleControllerById)
  .patch(auth(allPermissions.Roles.Update), validate(rolesValidation.updateRole), rolesController.updateRoleController)
  .delete(auth(allPermissions.Roles.Delete), validate(rolesValidation.deleteRole), rolesController.deleteRoleController);
router.route('/roles/role/name').post(validate(rolesValidation.getRoleByName), rolesController.getRoleControllerByName);
router
  .route('/roles/role/auth')
  .post(auth(), validate(rolesValidation.getRoleFromUserRole), rolesController.getRoleControllerForAuth);
router.post(
  './roles/user/assign',
  auth(allPermissions.Staffs.Update),
  validate(assignRole),
  rolesController.assignRoleController
);

router.get('/get-user-roles-count', auth(allPermissions.Roles.GetAll), rolesController.getUserRolesCount);

export default router;
