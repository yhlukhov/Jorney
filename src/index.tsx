import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./Store/store"
import history from './Common/Utils/history'
import "./index.css"
import App from "./App"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
)
