const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    blog: [{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    }],
    resetPasswordToken :{
        type: String
    },
    resetPasswordExpire :{
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
