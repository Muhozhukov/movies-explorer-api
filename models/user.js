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
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Описание не может быть короче 2 символов'],
    maxlength: [30, 'Описание не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm.test(v),
      message: 'Невалидная ссылка на изображение',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});
// eslint-disable-next-line func-names
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
