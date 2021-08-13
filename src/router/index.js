import Vue from 'vue'
import Router from 'vue-router'
import { kebabCase } from 'lodash'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        layout('Default', [
            route('Users', null, '/user/list'),
            route('UserDetail', null, '/user/detail/:userId'),
            route('UserCreate', null, '/user/create'),
            route('CardDelete', null, '/card/delete'),
            route('CardCreate', null, '/card/create'),
            route('Home', null, '/' )
        ])
    ]
})

function layout(layout, children, path = '') {
    const dir = kebabCase(layout)

    return {
        children,
        component: () => import(
        /* webpackChunkName: "layout-[request]" */
        `@/layouts/${dir}/Index`
        ),
        path,
    }
}

function route(name, component, path ='') {
    component = Object(component) === component
    ? component
    : { default: name.replace(' ', '') }

    const components = {}

    for (const [key, value] of Object.entries(component)) {
        components[key] = () => import(
            `@/views/${value}`
        )
    }

  return {
    name,
    components,
    path,
  }
}