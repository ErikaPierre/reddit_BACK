import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, unique: true },
  email: { type: String, unique: true, require: true },
  password: {
    type: String,
    require: true,
    min: [6, " Your password is too small, minimum 6 characters"],
  },
});

userSchema.methods.encrypt = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hashSync(password, salt);

  return hash;
};

userSchema.methods.verifPass = async (password, elderPassword) => {
  const result = await bcrypt.compare(password, elderPassword);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
