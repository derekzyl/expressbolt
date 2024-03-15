import { PermissionsType } from "../interfaces/interface.permissions";
import PERMISSIONS from "../models/models.permissions";

/**
 * The function creates a permission using the provided request object.
 * @param {PermissionsType} req - The parameter `req` is of type `PermissionsType`. It represents the
 * request object containing the data needed to create a permission.
 * @returns the created permission object.
 *  @example `{name:"account.create", details:"can create an account, "}`
 */
export const createOnePermissionService = async (req: PermissionsType) => {
  const permission = await PERMISSIONS.create(req);
  return permission;
};
/**
 * The function `createManyPermissionServices` inserts multiple permissions into a database and returns
 * the inserted permissions.
 * @param {PermissionsType[]} req - An array of objects representing permissions.
 * @returns the result of the `insertMany` operation, which is a promise that resolves to an array of
 * inserted documents.
 * @example `[{name:"account.create", details:"can create an account, "}]`
 */
export const createManyPermissionServices = async (req: PermissionsType[]) => {
  const permissions = await PERMISSIONS.insertMany(req);
  return permissions;
};
