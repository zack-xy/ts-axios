const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router()


// 路由
router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'hello world '
  })
})

// 测试get请求params参数
router.get('/base/get', function(req, res) {
  res.json(req.query)
})

// 测试post请求参数 -- start

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if(chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

// 测试post请求参数 -- end


// 测试error情况 -- start

router.get('/error/get', function(req, res) {
  if(Math.random() > 0.5) {
    res.json({
      msg: 'everything is fine'
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: 'everything is fine'
    })
  }, 3000);
})


// 测试error情况 -- stop



app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl + C to stop`)
})
