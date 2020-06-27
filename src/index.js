import SInputs from './components'
const version = '__VERSION__'

const install = Vue => {
  Object.keys(SInputs).forEach(name => {
      Vue.component(name, SInputs[name])
  })
}

const plugin = {
  install,
  version
}

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
