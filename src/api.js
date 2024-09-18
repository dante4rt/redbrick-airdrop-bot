const axios = require('axios');

async function getConfig(gameId, token) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/join',
    method: 'POST',
    data: {
      gameId,
      queryParams: token,
    },
  });

  return data.data;
}

async function getGameData(gameId, bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/info?gameId=' + gameId,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
  });

  return data.data;
}

async function checkIn(bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/missions/checkins',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
    data: {},
  });

  return data.data;
}

async function levelUp(bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/level-up',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
    data: {},
  });

  return data.data;
}

async function fetchOnboardingTasks(bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/missions?key=mission_onboarding',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
  });

  return data.data;
}

async function clearOnboardingTask(type, bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/missions/onboarding',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
    data: {
      type: type,
    },
  });

  return data;
}

async function completeFinalOnboardingTask(type, bearer, deviceId) {
  const { data } = await axios({
    url: 'https://api.redbrick.land/v1/panda-adventure/missions/onboarding-claims',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Device-Id': deviceId,
    },
    data: {
      type: type,
    },
  });

  return data;
}

module.exports = {
  getConfig,
  getGameData,
  checkIn,
  levelUp,
  fetchOnboardingTasks,
  clearOnboardingTask,
  completeFinalOnboardingTask,
};
