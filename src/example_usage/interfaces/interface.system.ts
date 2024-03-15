import { AnyObject, Document } from "mongoose";

export interface ISystem {
  canRegisterOnAdminPanel: boolean;
  sendSms: boolean;
  frontendUrl: string;
  frontendLogo: string;

  //others will come later
}

export interface ISystemDoc extends Document {}
export interface ISystemModel {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<AnyObject>;
}
