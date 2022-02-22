const { Schema, model } = require('mongoose');

const bankShema = new Schema({
  movements: [Number],
  movementsDates: [Date],
  interestRate: Number,
  currency: String,
  locale: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Bank', bankShema);
