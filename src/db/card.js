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
  const raw = localStorage.getItem('cards');
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
};

const getCardsByClient = async () => {
  let raw = localStorage.getItem('cards');
  raw = JSON.parse(raw);

  // 카드가 없는 경우
  if (!raw || !raw.length) {
    return [];
  }

  // 삭제된 카드 필터링
  raw = raw.filter((card) => {
    if (card['is_deleted'] === false) return card;
  });

  return convertSnakeToCamel.keysToCamel(raw);
};

const saveCards = async (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

module.exports = {
  getCards,
  getCardsByClient,
  createCard,
  saveCards,
};
