const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  movements: [Number],
  movementsDates: [Date],
  interestRate: Number,
  currency: String,
  locale: String,
});

module.exports = model('User', userSchema);
