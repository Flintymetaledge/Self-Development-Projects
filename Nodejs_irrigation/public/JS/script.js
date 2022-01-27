var form
const ws = new WebSocket('ws://http://192.168.0.161:1880/')

//when page loads adds event listener
window.addEventListener('load', function () {
  form = document.getElementById('irrigation-form')
  var state = {}

  //checks if web socket exsists then defines events
  if (ws) {
    ws.addEventListener('message', ({ data }) => {
      console.log('data recieved ' + data)
      state = JSON.parse(data)
      set_btn_state(state)
    })
  }

  //listen for event change on @irrigation-form
  document.getElementById('irrigation-form').addEventListener('change', () => {
    let state = {
      Tap1: Number(form.Tap1.checked),
      Tap2: Number(form.Tap2.checked),
      Tap3: Number(form.Tap3.checked),
      Tap4: Number(form.Tap4.checked),
      Tap5: Number(form.Tap5.checked),
      Tap6: Number(form.Tap6.checked),
    }

    if (ws) {
      ws.send(JSON.stringify(state))
    }
  })
})

//set state of buttons
function set_btn_state(object) {
  form.Tap1.checked = object.Tap1
  form.Tap2.checked = object.Tap2
  form.Tap3.checked = object.Tap3
  form.Tap4.checked = object.Tap4
  form.Tap5.checked = object.Tap5
  form.Tap6.checked = object.Tap6
}
