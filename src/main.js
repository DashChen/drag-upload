import Vue from 'vue'
// import App from './App.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//
// library.add(faCoffee)
//
// Vue.component('font-awesome-icon', FontAwesomeIcon)
import DragDropUpload from './components/dropUpload'

Vue.config.productionTip = false

Vue.component("drag-drop-upload", DragDropUpload)

export default DragDropUpload

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
