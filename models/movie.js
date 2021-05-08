const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" обязательно для заполнение'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режиссер" обязательно для заполнение'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "Продолжительность" обязательно для заполнение'],
  },
  description: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год" обязательно для заполнение'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm.test(v),
      message: 'Невалидная ссылка на изображение',
    },
    required: [true, 'Это поле обязательно для заполнения'],
  },
  trailer: {
    type: String,
    validate: {
      validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm.test(v),
      message: 'Невалидная ссылка на трейлер',
    },
    required: [true, 'Это поле обязательно для заполнения'],
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm.test(v),
      message: 'Невалидная ссылка на изображение',
    },
    required: [true, 'Это поле обязательно для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Это поле обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    // ref: 'movie',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.mow,
  },
});

module.exports = mongoose.model('movie', movieSchema);
