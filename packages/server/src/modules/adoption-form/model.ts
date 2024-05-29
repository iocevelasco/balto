import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const adoptionFormSchema = new Schema({
   label: {
      type: String,
      required: [true, "Please enter your name an last name."],
      trim: true,
   },
   inputType: {
      type: String,
      trim: true,
   },
   key: {
      type: String,
      trim: true,
   },
   active: {
      type: Boolean,
      default: true,
   },
},
   { timestamps: true }
);

const adoptionFormQuestion = mongoose.model("AdoptionForms", adoptionFormSchema);
export default adoptionFormQuestion;
