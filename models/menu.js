const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null },
    order: { type: Number, default: 0 },
    roles: {
      type: [String],
      enum: ['admin', 'user', 'manager'], // Roles allowed to access the menu
      default: ['user', 'admin'], // Default roles that can access the menu
    },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Menu', menuSchema);
