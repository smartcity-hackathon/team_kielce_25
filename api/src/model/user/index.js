import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods = {
  view() {
    let view = {};

    let fields = ["_id", "username", "points"];

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  }
};

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
