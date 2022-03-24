import BrowserWinHandler from './BrowserWinHandler'
import { WebServer } from './server'

const winHandler = new BrowserWinHandler({
  height: 440,
  width: 600,
  autoHideMenuBar: true
})

winHandler.onCreated(async _browserWindow => {
  await winHandler.loadPage('/')
  const server = new WebServer(8080)
})

export default winHandler
