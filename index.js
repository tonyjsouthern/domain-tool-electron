const {app,BrowserWindow,dialog,ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater");
var handlers        = require('./routelist.js');
var hers            = require('./hers.js');
var secret          = require('./secret.js')
var dns             = require('dns').promises;
var path            = require('path');
var Connection      = require('tedious').Connection;
var sql             = require('sequelize');
var axios           = require('axios');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  win = new BrowserWindow({ width: 1730, height: 900 })
  win.loadFile('./public/render/index.html')
   win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', function() {
  createWindow()
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})

var scope = {
  axios: axios,
  dns: dns,
  hers: hers,
  sql: sql,
  dkim: hers,
  secret: secret
}

// ROUTES
ipcMain.on('check-tracking', (req, arg) => {
  (async function() {
    var results = await handlers.checkTracking(scope, arg);
    req.returnValue = await results;
  })()
})

ipcMain.on('cname-singular', (req, arg) => {
  (async function() {
    var results = await handlers.getCnameSingular(scope, arg);
    req.returnValue = await results;
  })()
})

ipcMain.on('cname', (req, arg) => {
  (async function() {
    var results = await handlers.getCname(scope, arg);
    req.returnValue = await results;
  })()
})

ipcMain.on('dkim', (req, arg) => {
  (async function() {
    var results = await handlers.getDkim(scope, arg);
    req.returnValue = await results;
  })()
})

ipcMain.on('spf', (req, arg) => {
  (async function() {
    var results = await handlers.getSpf(scope, arg);
    req.returnValue = await results;
  })()
})


ipcMain.on('whois', (req, arg) => {
  (async function() {
    var results = await handlers.whois(scope, arg);
    req.returnValue = await results;
  })()
})



// console.log(process.versions)
