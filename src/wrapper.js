import component from '@/components/InputPhoneNumber.vue'

component.install = (Vue, options = {}) => {
  const { name = component.name } = options
  Vue.component(name, component)
}

export default component
