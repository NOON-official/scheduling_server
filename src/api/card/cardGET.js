const util = require('../../../src/lib/util');
const statusCode = require('../../../src/constants/statusCode');
const responseMessage = require('../../../src/constants/responseMessage');
const { cardDB } = require('../../../src/db');

module.exports = async (req, res) => {
  try {
    const cards = await cardDB.getCardsByClient();

    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.GET_CARD_SUCCESS, {
        card: cards,
      })
    );
  } catch (error) {
    console.log(error);

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
