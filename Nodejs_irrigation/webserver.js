//modules
//const { Console } = require('console')
const express = require('express')
const fs = require('fs')
const { send } = require('process')
const ws = require('ws')
//defaults
const port = 8080 // setting port for the application
const app = new express()
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
var state = {
  Tap1: 0,
  Tap2: 0,
  Tap3: 0,
  Tap4: 0,
  Tap5: 0,
  Tap6: 0,
}

// opens sockets and listens on @port prints in log, once succesful connection with no errors.
const server = app.listen(port, function (err) {
  if (typeof err == 'undefined') {
    console.log('irigation_system is running on : ' + port + ' port')
  }
})

const wsServer = new ws.Server({ server })

wsServer.on('connection', (ws) => {
  console.log('new client connected')
  ws.send(JSON.stringify(state))
  ws.on('message', (data) => {
    console.log('client sent: ' + data)
    state = JSON.parse(data)
    wsServer.clients.forEach((client) => client.send(JSON.stringify(state)))
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html')
})

app.get('/system_state', (req, res) => {
  res.sendFile(__dirname + '/src/data/state_data.json')
})

app.post('/system_input', (req, res) => {
  let data = req.body
  console.log('Post data: ' + JSON.stringify(data))
  var count = 0
  for (x in data) {
    if (data[x] == 1) {
      count++
    }
  }
  console.log('Total on:' + count)
  res.send(JSON.stringify(data))
})
