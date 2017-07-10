const Cookies = require('./cookies')

const createApiController = (controller) => {

  const urlPrefix = "http://localhost:49258"
  const csrftoken = Cookies.get('csrftoken')

  controller.fetch = (req) => {
    const request = new XMLHttpRequest()
    request.open("GET", urlPrefix + req.url, true)
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let action = {type: "RESPONSE_ARRIVED", from: req, content: JSON.parse(this.responseText)}
        controller.dispatch(action)
      }
    }
    request.send()
    controller.dispatch({type: "REQUEST_MADE", request: req})
  }

  controller.report = (req) => {
    const request = new XMLHttpRequest()
    request.open("POST", urlPrefix + req.url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let action = {type: "RESPONSE_ARRIVED", from: req, content: JSON.parse(this.responseText)}
        controller.dispatch(action)
      }
    }
    request.send(JSON.stringify(req.data))
    controller.dispatch({type: "REQUEST_MADE", request: req})
  }

}

export default createApiController
