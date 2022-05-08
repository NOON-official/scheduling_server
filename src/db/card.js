const { LocalStorage } = require('node-localstorage');
const { nanoid } = require('nanoid');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const localStorage = new LocalStorage('data/db');

const createCard = async (card) => {
  const cards = await getCards();

  const newCard = {
    id: nanoid(),
    content: card.content,
    deadline: card.deadline,
    detail: `${card.detail ? card.detail : ''}`,
    state: card.state,
    created_at: new Date(),
    updated_at: new Date(),
    is_deleted: false,
  };

  cards.push(newCard);
  await saveCards(cards);

  return convertSnakeToCamel.keysToCamel(newCard);
};

const getCards = async () => {
  const rows = localStorage.getItem('cards');
  if (!rows) {
    return [];
  }
  return JSON.parse(rows);
};

const getCardsByClient = async () => {
  let rows = localStorage.getItem('cards');
  rows = JSON.parse(rows);

  // 카드가 없는 경우
  if (!rows || !rows.length) {
    return [];
  }

  // 삭제된 카드 필터링
  rows = rows.filter((card) => {
    if (card['is_deleted'] === false) return card;
  });

  return convertSnakeToCamel.keysToCamel(rows);
};

const deleteCardById = async (cardId) => {
  let rows = localStorage.getItem('cards');
  rows = JSON.parse(rows);

  if (!rows || !rows.length) {
    return null;
  }

  let existingCards = []; // 삭제할 카드를 제외한 나머지 카드

  // 삭제할 카드 찾기
  let deletingCard = rows.filter((card) => {
    if (card['id'] === cardId) return card;
    else existingCards.push(card);
  });

  if (!deletingCard.length) {
    // 해당 카드가 존재하지 않는 경우
    return null;
  } else {
    deletingCard = deletingCard[0];
    deletingCard['is_deleted'] = true;
    deletingCard['updated_at'] = new Date();
  }

  existingCards.push(deletingCard); // soft delete된 후의 카드를 저장
  await saveCards(existingCards);

  const cards = getCardsByClient();

  return cards;
};

const saveCards = async (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

module.exports = {
  getCards,
  getCardsByClient,
  createCard,
  saveCards,
  deleteCardById,
};
