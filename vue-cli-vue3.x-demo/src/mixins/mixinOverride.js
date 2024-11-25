// export default {
//   data() {
//     return {
//       str: 'mixin value'
//     }
//   },
//   created() {
//     console.log('mixin created', 'str =', this.str)
//   },
//   methods: {
//     funA() {
//       console.log('fun A called: mixin funA', 'str =', this.str)
//     }
//   }

import { onMounted } from 'vue'

export function useOverride() {
  const str = 'mixin value'
  const funA = () => {
    console.log('mixin fun A called:', 'str =', str)
  }
  onMounted(() => {
    console.log('mixin onMounted', 'str =', str)
  })
}
