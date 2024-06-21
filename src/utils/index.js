/* eslint-disable */
const dayjs = require('dayjs');

module.exports.printLog = (type, message) => {
  let msg = '';
  switch (type) {
    case 'error':
      msg += `[${dayjs().format()}][E]:${message}`;
      return console.error(msg);
    case 'info':
      msg += `[${dayjs().format()}][I]:${message}`;
      break;
    case 'warning':
      msg += `[${dayjs().format()}][W]:${message}`;
      return console.warn(msg);
    case 'event':
      msg += `[${dayjs().format()}][G]:${message}`;
      break;
    default:
      msg += `[${dayjs().format()}][D]:${message}`;
      break;
  }
  return console.log(msg);
};