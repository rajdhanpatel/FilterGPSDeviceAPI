const axios = require('axios');
const headers = require('../constants/slackConstants');

async function getDataFromExternalAPI(loconavUrl) {
  try {
    const response = await axios.get(`${loconavUrl}`, { headers });
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getDataFromExternalAPI;

