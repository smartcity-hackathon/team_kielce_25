import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    userID: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      require: true
    },
    longitude: {
      type: Number,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    category: {
      type: String,
      required: true
    },
    confirmations: {
      type: Number,
      required: true,
      default: 1
    },
    fixed: {
      type: Boolean,
      required: true,
      default: false
    },
    extra: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

reportSchema.methods = {
  view() {
    let view = {};

    let fields = [
      "_id",
      "latitude",
      "longitude",
      "description",
      "category",
      "confirmations",
      "fixed",
      "extra"
    ];

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  }
};

const model = mongoose.model("Report", reportSchema);

export const schema = model.schema;
export default model;
