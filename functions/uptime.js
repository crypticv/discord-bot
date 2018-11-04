const formatNumStr = require('./formatnumberstring.js');

module.exports = function (client){
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  let ms = client.uptime % 1000;

  var uptime = {
    totalSeconds: totalSeconds,
    hours: formatNumStr(hours, 2),
    minutes: formatNumStr(minutes, 2),
    seconds: formatNumStr(seconds, 2),
    ms: ms
  }

  return uptime;
}
