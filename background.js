'use strict';

function getList() {
  var list = localStorage.getItem('list_fb')
  if (!list) {
    localStorage.setItem('list_fb', JSON.stringify([]));
  }
  return localStorage.getItem('list_fb');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Cargado", chrome.tabs);
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("Evento de mensage ejecutado:", req, sender)
  sendResponse({
    list: getList()
  })
})

chrome.tabs.onCreated.addListener(function (params) {
  console.log('Creada:', params)
})

chrome.tabs.onUpdated.addListener(function (params) {
  console.log('Actualizada:', params)

  getCurrentTabFacebook(function (data, error) {
    (data ? init() : null)
  })
})

chrome.tabs.onActiveChanged.addListener(function (params) {
  console.log('Pestaña activada', params)

  getCurrentTabFacebook(function (data, error) {
    (data ? init() : null)
  })
});

function getCurrentTabFacebook(callback) {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    console.log("TABS:", tabs)
    var current = tabs.filter(function (tab) {
      return tab.active;
    })[0];

    if (current) {
      if ((current.url + '').indexOf('facebook.com') != -1) {
        return callback(current.url)
      }
    }
    return callback(null, true)
  });
}

function init() {
  chrome.tabs.executeScript(null, {
    file: "whitelist.js"
  });
}