const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  location: { type: String },
  phone: { type: Array },
  email: { type: Array },
  contactPerson: { type: Array },
  contactRole: { type: String },
  internalComment: { type: String },
  internalRepresentative: { type: String },
  priority: { type: Number, default: 0 },
  isMailSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
