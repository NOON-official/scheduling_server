const util = require('../../lib/util');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const { cardDB } = require('../../db');
const logger = require('../../config/winston');

module.exports = async (req, res) => {
  const isEmpty = (value) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  };

  const { cardId } = req.params;
  const { currentState, newState } = req.body;

  if (isEmpty(cardId) || isEmpty(currentState) || isEmpty(newState)) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const validState = [0, 1, 2];

  if (!(currentState in validState) || !(newState in validState) || currentState === newState) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_CARD_STATE));
  }

  try {
    const updatedCard = await cardDB.updateCardStateById(cardId, newState);

    if (!updatedCard) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_CARD));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_CARD_SUCCESS, updatedCard));
  } catch (error) {
    console.log(error);
    logger.error(error.toString());

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
  }
};
