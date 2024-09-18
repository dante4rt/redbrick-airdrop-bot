const { CronJob } = require('cron');
const {
  getConfig,
  getGameData,
  checkIn,
  levelUp,
  fetchOnboardingTasks,
  clearOnboardingTask,
  completeFinalOnboardingTask,
} = require('./api');

async function performDailyLogin(config) {
  try {
    await checkIn(process.env.BEARER, config.deviceId);
    console.log(`✅ Daily login completed!`.green);
  } catch (error) {
    if (
      error.response &&
      error.response.data.error.includes('already_checkin_today')
    ) {
      console.log(`❗ You have already checked in today!`.red);
    } else {
      console.log(`🚨 Error during check-in: ${error.message}`.red);
    }
  }
}

async function performLevelUp(config) {
  try {
    const gameData = await getGameData(
      config.gameId,
      process.env.BEARER,
      config.deviceId
    );
    if (
      config.participant.inventory.totalCoin <=
      gameData.inventory.currentCoinOfLevel
    ) {
      console.log(
        `You cannot upgrade your Panda because your coin is not enough (needs ${
          gameData.inventory.currentCoinOfLevel -
          config.participant.inventory.totalCoin
        } coins more)!`.red
      );
    } else {
      let topCap = config.participant.inventory.totalCoin;
      while (topCap > gameData.inventory.currentCoinOfLevel) {
        topCap -= gameData.inventory.currentCoinOfLevel;
        const response = await levelUp(process.env.BEARER, config.deviceId);

        if (response.inventory) {
          console.log(
            `Your level has been upgraded to ${response.inventory.level}!`.green
          );
          console.log(`Your balance now: ${response.inventory.totalCoin}`);
        }
      }
    }
  } catch (error) {
    if (error.response.data.error.includes('not_enough_coin')) {
      console.log(
        `You cannot upgrade your level as your coin is not enough!`.red
      );
    } else {
      console.log(`Error in auto upgrade level: ${error.response.data.error}`);
    }
  }
}

async function performCompleteTasks(config) {
  try {
    const onboardingTasks = await fetchOnboardingTasks(
      process.env.BEARER,
      config.deviceId
    );
    for (const task of onboardingTasks) {
      if (task.status !== 'completed') {
        const response = await clearOnboardingTask(
          task.type,
          process.env.BEARER,
          config.deviceId
        );
        if (response.status) {
          await completeFinalOnboardingTask(
            task.type,
            process.env.BEARER,
            config.deviceId
          ).then(() =>
            console.log(`Tasks ${task.type} has been completed! ✅`.green)
          );
        }
      } else {
        console.log(`All tasks have been cleared, congrats! 🤍`.green);
        break;
      }
    }
  } catch (error) {
    console.log(`Error in auto claim tasks: ${error.response.data.error}`);
  }
}

async function automaticMode(config) {
  console.log('Starting automatic mode...'.yellow);
  await performDailyLogin(config);
  await performLevelUp(config);
  await performCompleteTasks(config);

  const job = new CronJob('0 0 * * *', async () => {
    console.log('Executing automatic tasks...'.yellow);
    await performDailyLogin(config);
    await performLevelUp(config);
    await performCompleteTasks(config);
  });

  job.start();
  console.log(
    'Automatic mode is active. Tasks will run daily at midnight.'.green
  );
  console.log(
    "📢 While waiting, don't forget to subscribe to https://t.me/HappyCuanAirdrop for the latest and best airdrops and bots!\n"
      .cyan
  );
}

module.exports = {
  getConfig,
  performDailyLogin,
  performLevelUp,
  performCompleteTasks,
  automaticMode,
};
