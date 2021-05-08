const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo, changeUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), changeUserInfo);

module.exports = router;
