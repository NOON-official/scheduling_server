const util = require('../../../src/lib/util');
const statusCode = require('../../../src/constants/statusCode');
const responseMessage = require('../../../src/constants/responseMessage');
const { cardDB } = require('../../../src/db');
const logger = require('../../config/winston');

module.exports = async (req, res) => {
  try {
    const { cardId } = req.params;

    if (!cardId) {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
    }

    const cards = await cardDB.deleteCardById(cardId);

    if (!cards) {
      res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_CARD));
    }

    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.DELETE_CARD_SUCCESS, {
        card: cards,
      })
    );
  } catch (error) {
    console.log(error);
    logger.error(error.toString());

    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  } finally {
  }
};
