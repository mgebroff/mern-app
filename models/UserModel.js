/******************* IMPORT ************************************************/
import mongoose from "mongoose";

/******************* JOB SCHEMA *********************************************/
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "San Francisco",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

/******************* EXPORT *************************************************/
export default mongoose.model("User", UserSchema);
