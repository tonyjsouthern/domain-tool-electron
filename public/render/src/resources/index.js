export function configure(config) {
  //config.globalResources([]);
}

SystemJS.config({
  map: {
    'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
  },
  transpiler: 'plugin-babel'
});

window.ipc.on('updateReady', function(event, text) {
    // changes the text of the button
    console.log("ready")
    var container = document.getElementById('ready');
    container.innerHTML = "new version ready!";
})
