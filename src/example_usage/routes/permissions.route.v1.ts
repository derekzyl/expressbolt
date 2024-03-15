import { auth } from '@modules/auth';
import { validate } from '@modules/validate';
import express, { Router } from 'express';
import { permissionsController, permissionsValidation } from '..';

const router: Router = express.Router();
router
  .route('/')
  .get(validate(permissionsValidation.getPermissions), permissionsController.getAllPermissionsController)
  .post(
    auth(),
    /* staffMiddleWare(), */
    validate(permissionsValidation.createPermission),
    permissionsController.createPermissionsController
  );
router
  .route('/:id')
  .get(validate(permissionsValidation.getPermission), permissionsController.getOnePermissionsController)
  .put(validate(permissionsValidation.updatePermission), permissionsController.updatePermissionsController)
  .delete(validate(permissionsValidation.deletePermission), permissionsController.deletePermissionsController);

router
  .route('/many/permit')
  .post(validate(permissionsValidation.createPermissions), permissionsController.createManyPermissionsController);
export default router;
