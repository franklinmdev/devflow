import { model, models, Schema, Types, Document } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  provider: string;
  providerAccountId: string;
  password?: string;
}

export interface IAccountDoc extends IAccount, Document {}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
