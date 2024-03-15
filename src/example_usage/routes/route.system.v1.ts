import express, { Router } from "express";
import { systemController } from "..";

const router: Router = express.Router();

router
  .route("/")
  .post(
    /*     auth(allPermissions.Systems.Create),
    validate(systemValidation.createSystem), */
    systemController.createSystemController
  )
  .get(systemController.getSystemsController);
router
  .route("/:id")
  .get(
    /* validate(systemValidation.getSystem) */ systemController.getSystemController
  )
  .patch(
    /*  auth(allPermissions.Systems.Update),
    validate(systemValidation.updateSystem), */
    systemController.updateSystemController
  )
  .delete(
    /*     auth(allPermissions.Systems.Delete),
    validate(systemValidation.deleteSystem), */
    systemController.deleteSystemController
  );

export default router;
