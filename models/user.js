const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requred: [true, 'Заполни почту'],
    unique: [true, 'Значение почты должно быть уникальным'],
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Заполни пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "Имя" обязательно для заполнения'],
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: 30,
  },
});
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        })
        .catch(next);
    });
};

module.exports = mongoose.model('user', userSchema);
