import { ipcRenderer } from 'electron';

const blockingError = "TypeError: Cannot read property 'send' of undefined";

require('electron-notification-shim')();

// define a new console
var console = (function(oldCons) {
  return {
    log: function(text) {
      oldCons.log(text);
    },
    info: function(text) {
      oldCons.info(text);
    },
    warn: function(text) {
      oldCons.warn(text);
    },
    error: function(text) {
      if (text) {
        oldCons.error(text);
      }

      if (text && text.includes(blockingError)) {
        ipcRenderer.send('errorInWindow');
      }
    },
  };
})(window.console);

//Then redefine the old console
window.console = console;