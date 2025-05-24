import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  provider: string;
  providerAccountId: string;
  password?: string;
}

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

const Account = models?.account || model<IAccount>("Account", AccountSchema);

export default Account;
