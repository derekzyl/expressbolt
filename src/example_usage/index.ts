import * as permissionsController from "./controllers/controller.permissions";
import * as rolesController from "./controllers/controller.roles";
import * as roleServices from "./services/service.roles";
import * as permissionsValidation from "./validate/validation.permission";
import * as rolesValidation from "./validate/validation.roles";

import * as systemController from "./controllers/controller.system";
import * as systemValidation from "./validate/validation.system";

export {
  permissionsController,
  permissionsValidation,
  roleServices,
  rolesController,
  rolesValidation,
  systemController,
  systemValidation,
};
