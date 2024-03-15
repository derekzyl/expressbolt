import { QueryResult } from '@modules/paginate/paginate';
import mongoose, { Document, Model } from 'mongoose';

interface IRoles {
  name: string;
  details: string;
  permissions: string[];
}

export interface IRolesDoc extends IRoles, Document {}
export interface IRolesModel extends Model<IRolesDoc> {
  isExists(reference: string, excludeBillId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type RoleTypes = Pick<IRoles, 'details' | 'name' | 'permissions'>;
