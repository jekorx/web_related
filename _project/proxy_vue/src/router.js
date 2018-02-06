import Vue from 'vue'
import VueRouter from "vue-router"

import Form from "./components/form.vue"
import Step from "./components/step.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/form'
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/step',
      component: Step
    }
  ]
})
