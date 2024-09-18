const readlineSync = require('readline-sync');

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log('========================================'.cyan);
  console.log('=      🚀 Redbrick Airdrop Bot 🚀      ='.cyan);
  console.log('=     Created by HappyCuanAirdrop      ='.cyan);
  console.log('=    https://t.me/HappyCuanAirdrop     ='.cyan);
  console.log('========================================'.cyan);
  console.log();
}

function askUserChoice() {
  console.log('\nWhat would you like to do?');
  console.log('1. Default Flow');
  console.log('2. Automatic Flow');
  console.log('0. Exit');

  return readlineSync.question('\nEnter your choice: ');
}

function askDefaultChoice() {
  console.log('\nDefault Flow Menu:');
  console.log('1. Auto Daily Login');
  console.log('2. Auto Upgrade Level');
  console.log('3. Auto Complete Tasks');
  console.log('0. Back');

  return readlineSync.question('\nEnter your choice: ');
}

module.exports = {
  displayHeader,
  askUserChoice,
  askDefaultChoice,
};
