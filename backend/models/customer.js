const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String },
  location: { type: String },
  phone: { type: String },
  contactPerson: { type: String },
  contactRole: { type: String },
  internalComment: { type: String },
  internalRepresentative: { type: String },
  priority: { type: Number },
  isMailSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
