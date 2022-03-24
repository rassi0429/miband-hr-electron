import http from 'http'
import express from 'express'
import ws from 'ws'

export class WebServer {
  constructor (port) {
    this.app = express()
    this.app.use(express.urlencoded())
    this.app.use(allowCrossDomain)

    this.server = http.createServer(this.app)
    this.wss = new ws.Server({ server: this.server })

    this.app.get('/', (_, res) => {
      res.send('OK')
    })

    this.server.listen(port)
  }
}

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}
