module.exports = async () => {
  require('dotenv').config();
  const baseUrl = process.env.IMAGE_BASE_URL;
  const randomNumber = Math.floor(Math.random() * 30) + 1;
  return `${baseUrl}/m${randomNumber}.jpg`;
};
