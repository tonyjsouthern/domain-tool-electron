// Module Imports
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

// ----- Begin Electron Specific Code -----
// Delcare Global Window Variable
let win

// Create the browser window
function createWindow () {
  win = new BrowserWindow({ width: 1730, height: 900 })
  win.loadFile('./public/render/index.html')
// win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

// List for the app to be ready and check for updates
app.on('ready', function() {
  createWindow()
  autoUpdater.checkForUpdates();
});

// Close the app
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

// Trigger update ready message
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

// Quit the application and install the update
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
// ----- End Electron Specific Code -----

// Middleware for passing in global variables
var scope = {
  axios: axios,
  dns: dns,
  hers: hers,
  sql: sql,
  dkim: hers,
  secret: secret
}

// ROUTES
// Tracking Script
ipcMain.on('check-tracking', (req, arg) => {
  (async function() {
    var results = await handlers.checkTracking(scope, arg);
    req.returnValue = await results;
  })()
})

// Check a singular CNAME
ipcMain.on('cname-singular', (req, arg) => {
  (async function() {
    var results = await handlers.getCnameSingular(scope, arg);
    req.returnValue = await results;
  })()
})

// Check all of a customers CNAMES
ipcMain.on('cname', (req, arg) => {
  (async function() {
    var results = await handlers.getCname(scope, arg);
    req.returnValue = await results;
  })()
})

// Check both DKIM records
ipcMain.on('dkim', (req, arg) => {
  (async function() {
    var results = await handlers.getDkim(scope, arg);
    req.returnValue = await results;
  })()
})

// Check an SPF record
ipcMain.on('spf', (req, arg) => {
  (async function() {
    var results = await handlers.getSpf(scope, arg);
    req.returnValue = await results;
  })()
})

// Perform a whois on a domain
ipcMain.on('whois', (req, arg) => {
  (async function() {
    var results = await handlers.whois(scope, arg);
    req.returnValue = await results;
  })()
})
