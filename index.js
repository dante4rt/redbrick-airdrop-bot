require('dotenv').config();
require('colors');
const { displayHeader, askUserChoice, askDefaultChoice } = require('./src/ui');
const {
  getConfig,
  performDailyLogin,
  performLevelUp,
  performCompleteTasks,
  automaticMode,
} = require('./src/actions');
const jwt = require('jsonwebtoken');

const TOKEN = process.env.TOKEN;
const BEARER = process.env.BEARER;

(async () => {
  displayHeader();
  console.log(`⏳ Please wait, fetching your info...\n`.yellow);

  try {
    const decoded = jwt.decode(BEARER);
    const gameId = decoded.gameId;
    const config = await getConfig(gameId, TOKEN);

    console.log(
      `🎉 Hello ${config.participant.firstName} (@${config.participant.username}), welcome to the Happy Cuan Airdrop Bot!\n`
        .green
    );
    console.log(`Here's your profile details 👇\n`.green);
    console.log(
      `👤 Name: ${config.participant.firstName} ${config.participant.lastName}`
        .green
    );
    console.log(`📛 Username: @${config.participant.username}`.green);
    console.log(
      `💎 VIP Status: ${config.participant.isPremium === 1 ? 'No' : 'Yes'}`
        .green
    );
    console.log(`🆔 Device ID: ${config.deviceId}`.green);
    console.log(
      `💰 Wallet Address: ${
        config.participant.inventory.walletAddress || 'Not linked'
      }`.green
    );
    console.log(
      `🪙  Total Coins: ${config.participant.inventory.totalCoin}`.green
    );
    console.log(`🏅 Level: ${config.participant.inventory.level}`.green);
    console.log(
      `⚡ Level Speed: ${config.participant.inventory.levelSpeed}`.green
    );

    let choice = askUserChoice();

    if (choice === '2') {
      await automaticMode({ ...config, BEARER, TOKEN });
    } else {
      const defaultChoice = askDefaultChoice();

      switch (defaultChoice) {
        case '1':
          await performDailyLogin(config);
          break;
        case '2':
          await performLevelUp(config);
          break;
        case '3':
          await performCompleteTasks(config);
          break;
        case '0':
          console.log('Returning to main menu...'.cyan);
          choice = askUserChoice();
          break;
        default:
          console.log('Invalid choice, please try again.'.red);
      }
    }
  } catch (error) {
    console.log(
      `🚨 Error: ${error.response ? error.response.data.error : error}`.red
    );
  }
})();
