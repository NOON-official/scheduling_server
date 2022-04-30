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

const saveCards = async (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

module.exports = {
  getCards,
  createCard,
  saveCards,
};
