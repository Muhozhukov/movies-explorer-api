const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundErrod');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');

const errorHandle = (err, next) => {
  if (err.name === 'ValidationError') {
    throw new BadRequestError('Ошибка обработки запроса');
  } if (err.name === 'CastError') {
    throw new BadRequestError('Ошибка обработки запроса');
  } if (err.name === 'MongoError' && err.code === 11000) {
    throw new ConflictError('Адрес электронной почты уже используется');
  }

  next(err);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => {
      errorHandle(err, next);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      errorHandle(err, next);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      // eslint-disable-next-line eqeqeq
      const cardIsMine = req.user._id == card.owner;
      if (cardIsMine) {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => res.send(deletedCard))
          .catch((err) => {
            errorHandle(err, next);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете этого сделать');
      }
    })
    .catch((err) => {
      errorHandle(err, next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      return res.send(card);
    })
    .catch((err) => {
      errorHandle(err, next);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      return res.send(card);
    })
    .catch((err) => {
      errorHandle(err, next);
    })
    .catch(next);
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
