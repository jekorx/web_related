import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')

const body = document.body
if (body.children.length > 0) {
  body.insertBefore(root, body.children[0])
} else {
  body.appendChild(root)
}

new Vue({
  render: h => h(App)
}).$mount(root)
