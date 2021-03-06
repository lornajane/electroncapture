// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const process = require('process')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
	frame: false,
	backgroundColor: '#141926',
	titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.argv.length==3){
	mainWindow.loadURL(process.argv[2]);
  } else if (((process.argv.length)==2)){
   	mainWindow.loadURL(process.argv[1]);
  } else {
  	try { // Windows
  		mainWindow.loadURL('https://obs.ninja/electron?name='+path.basename(process.env.PORTABLE_EXECUTABLE_FILE).split(".")[0])
  	} catch (e){ // macOS
		mainWindow.loadURL('https://obs.ninja/electron')
  	}
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
