import { Schema, model, ObjectId } from "mongoose";

interface IBard {
  chat: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[];
  user: ObjectId;
}

const bardSchema = new Schema<IBard>(
  {
    chat: [
      {
        question: String,
        answer: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IBard>("Bard", bardSchema);
