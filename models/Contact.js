const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // 🌟 تعديل الـ subject ليكون اختيارياً أو إعطائه قيمة افتراضية
  subject: {
    type: String,
    required: false, // 🟢 اجعلها false أو احذف السطر تماماً
    default: "Contact Us Message" 
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);