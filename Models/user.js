
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },

  username: { type: String, unique: true, sparse: true },

  email: { type: String, unique: true },

  password: { type: String },

  phone: { type: String },

  otp: { type: Number },

  createTime: {
    type: Date,
    default: Date.now,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  otpExpiryTime: {
    type: Date,
    required: true,
  },

  profileImage: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

