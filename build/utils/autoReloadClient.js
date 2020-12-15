const config = require('../config.js');

function logWithPrefix(info) {
  console.log(`[EAR] ${info}`);
}
const source = new EventSource(`http://${config.dev.ip}:${config.dev.port}/__webpack_ext_reload__`);

source.addEventListener(
  'open',
  () => {
    logWithPrefix('connected');
  },
  false,
);

source.addEventListener(
  'message',
  (event) => {
    logWithPrefix('received a no event name message, data:');
  },
  false,
);

source.addEventListener(
  'pause',
  () => {
    logWithPrefix('received pause message from server, ready to close connection!');
    source.close();
  },
  false,
);

source.addEventListener(
  'compiled successfully',
  (event) => {
    const shouldReload = JSON.parse(event.data).action === 'reload extension and refresh current page';

    if (shouldReload) {
      logWithPrefix('received the signal to reload chrome extension');
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id && !tab.url.startsWith('chrome://')) {
            let received = false;
            chrome.tabs.sendMessage(
              tab.id,
              {
                from: 'background',
                action: 'refresh current page',
              },
              (res) => {
                if (!res) return;

                const { from, action } = res;
                if (!received && from === 'content script' && action === 'reload extension') {
                  received = true;
                  source.close();
                  logWithPrefix('reload extension');
                  chrome.runtime.reload();
                }
              },
            );
          }
        });
      });
    }
  },
  false,
);

source.addEventListener(
  'error',
  (event) => {
    if (event.target.readyState === 0) {
      console.error('You need to open devServer first!');
    } else {
      console.error(event);
    }
  },
  false,
);
