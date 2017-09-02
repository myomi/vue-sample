import Vue from 'vue'
import Router from 'vue-router'
import SVGEditor from '@/components/SVGEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SVGEditor',
      component: SVGEditor
    }
  ]
})
