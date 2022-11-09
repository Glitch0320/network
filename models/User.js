const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: true },
    thoughts: [{ type: Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Types.ObjectId, ref: "User" }],
    lastAccessed: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
