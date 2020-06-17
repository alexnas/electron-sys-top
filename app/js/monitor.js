const path = require('path');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

const cpuOverload = 17;

notifyUser({
  title: 'CPU Overload',
  body: `CPU is over ${cpuOverload}`,
});

// Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then(info => {
    console.log(info);
    document.getElementById('cpu-usage').innerText = info + '%';

    document.getElementById('cpu-progress').style.width = info + '%';

    // Make progress bar red if overload
    if (info >= cpuOverload) {
      document.getElementById('cpu-progress').style.background = 'red';
    } else {
      document.getElementById('cpu-progress').style.background = '#30c88b';
    }
  });

  // CPU Free
  cpu.free().then(info => {
    document.getElementById('cpu-free').innerText = info + '%';
  });

  // System Uptime
  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime());
  // console.log(secondsToDhms(os.uptime()));
}, 2000);

// Set CPU model
document.getElementById('cpu-model').innerText = cpu.model();

// Computer Name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Total Memory
mem.info().then(info => {
  document.getElementById('memory-total').innerText = info.totalMemMb;
});

// Show days, hours, mins, seconds
function secondsToDhms(seconds) {
  seconds = +seconds;
  d = Math.floor((seconds / 3600) * 24);
  h = Math.floor((seconds % (3600 * 24)) / 3600);
  m = Math.floor((seconds % 3600) / 60);
  s = Math.floor(seconds % 60);

  return `${d}d, ${h}h, ${m}m, ${s}s`;
}

// Send notification
function notifyUser(options) {
  new Notification(options.title, options);
}
