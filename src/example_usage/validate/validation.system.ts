import { objectId } from '@modules/validate';
import Joi from 'joi';
import { ISystem } from './interface.system';

const createSystemBody: Record<keyof ISystem, any> = {
  canRegisterOnAdminPanel: Joi.boolean(),
  frontendLogo: Joi.string(),
  frontendUrl: Joi.string(),
  sendSms: Joi.boolean(),
};

export const createSystem = {
  body: Joi.object().keys(createSystemBody),
};

export const updateSystem = {
  body: Joi.object().keys(createSystemBody),
  params: Joi.object().keys({ id: Joi.custom(objectId).required() }),
};
export const getSystem = {
  params: Joi.object().keys({ id: Joi.custom(objectId).required() }),
};

export const deleteSystem = {
  params: Joi.object().keys({ id: Joi.custom(objectId).required() }),
};
