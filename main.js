const {app, BrowserWindow,ipcMain,session} = require('electron')
const path = require('path')

let mainWindow = null

async function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, '/render/preload.js'),
      nodeIntegration: true, //あんまいくないらしい
      contextIsolation: false //あんまいくないらしい
    },
  })

  // and load the index.html of the app.
  await mainWindow.loadFile('./render/index.html')
  const args = process.argv.slice(process.env.NODE_ENV === 'development' ? 2 : 1)
  if(args[0]) {
    console.log("token")
    mainWindow.webContents.send("key",[args[0]])
  }
}

app.whenReady().then(() => {
  createWindow()


  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["User-Agent"] = "Chrome";
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// WebSocket
const ws = require('ws')
const express = require("express")
const http = require("http")
const exp = express()
exp.use(express.static(__dirname + '/static/'))
const server = http.createServer(exp)
const wss = new ws.Server({server: server})
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      client.send(message.toString())
    })
  })
})
server.listen(8080)



// Token 周り
ipcMain.on('open-miband-auth',  (event, arg) => {
  const loginWindow = new BrowserWindow({width: 600, height: 1000})
  session.defaultSession.clearCache(() => {})
  loginWindow.loadURL("https://account.xiaomi.com/oauth2/authorize?skip_confirm=false&client_id=2882303761517383915&pt=0&scope=1+6000+16001+20000&redirect_uri=https%3A%2F%2Fhm.xiaomi.com%2Fwatch.do&_locale=en_US&response_type=code")
  loginWindow.webContents.on("did-fail-load",async (evt,code,desc,url)=> {
    let w = url.replace("https://hm.xiaomi.com/watch.do?code=","")
    const t = await getDeviceToken(w)
    mainWindow.webContents.send("key",t)
    loginWindow.close()
  })
})


const axios = require("axios")
const login_uri = "https://account.huami.com/v2/client/login"

async function getDeviceToken(code) {
  const token = code
  const body = {
    'dn': 'account.huami.com,api-user.huami.com,app-analytics.huami.com, api-watch.huami.com, api-analytics.huami.com,api-mifit.huami.com',
    'app_version': '5.9.2-play_100355',
    'source': 'com.huami.watch.hmwatchmanager',
    'country_code': 'US',
    'device_id': `02:00:00:${generateRandom()}:${generateRandom()}:${generateRandom()}`,
    'third_name': 'mi-watch',
    'lang': 'en',
    'device_model': 'android_phone',
    'allow_registration': 'false',
    'app_name': 'com.huami.midong',
    'code': token,
    'grant_type': 'request_token'
  }
  let params = new URLSearchParams()
  for (let item in body) {
    params.append(item, body[item])
  }

  const res = await axios.post(login_uri, params)

  const user_id = res.data.token_info.user_id
  const app_token = res.data.token_info.app_token
  // const login_token = res.data.token_info.login_token

  const devices_uri = `https://api-mifit-us2.huami.com/users/${user_id}/devices`

  const r = await axios.get(devices_uri, { params: { 'enableMultiDevice': 'true' }, headers: { 'apptoken': app_token } })
  const result = r.data.items
  let tokens = []
  result.forEach(element => {
    try {
      tokens.push(JSON.parse(element.additionalInfo).auth_key)
    } catch {}
  })
  console.log("Token OK")
  return tokens
}
function generateRandom() {
  const hex = (Math.random() * 0xFF | 0).toString(16)
  return ("00" + hex).slice(-2)
}
