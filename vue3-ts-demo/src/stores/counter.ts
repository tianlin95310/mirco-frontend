import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  const token = ref('xxxx')

  function increment() {
    count.value++
  }

  function setToken(value: string) {
    token.value = value
  }

  const getToken = computed(() => token.value)

  return { count, doubleCount, increment, token, setToken, getToken }
})
