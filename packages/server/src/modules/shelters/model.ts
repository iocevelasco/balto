import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a shelter name."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  information: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Enter a valid email address."],
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
},
  { timestamps: true }
);

const Shelters = mongoose.model("Shelters", shelterSchema);
export default Shelters;
