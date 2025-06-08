import { model, models, Schema, Types, Document } from "mongoose";

export const ACTION_ENUMS = [
  "view",
  "upvote",
  "downvote",
  "bookmark",
  "post",
  "edit",
  "delete",
  "search",
] as const;

const ACTION_TYPES_ENUMS = ["question", "answer"] as const;

export interface IInteraction {
  user: Types.ObjectId;
  action: (typeof ACTION_ENUMS)[number];
  actionId: Types.ObjectId;
  actionType: (typeof ACTION_TYPES_ENUMS)[number];
}

export interface IInteractionDoc extends IInteraction, Document {}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: ACTION_ENUMS,
      required: true,
    },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: {
      type: String,
      enum: ACTION_TYPES_ENUMS,
      required: true,
    },
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
