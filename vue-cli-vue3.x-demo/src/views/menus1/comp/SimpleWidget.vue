<template>
  <div>
    {{ configName }}
  </div>
</template>
<script>
const modObj = {
  data:  {
    configName: 'beforeCreate SimpleWidget'
  }
}
export default {
  name: 'SimpleWidget',
  beforeCreate() {

  },
  data() {
    return {
      configName: 'SimpleWidget'
    }
  },
}

</script>

<style>
</style>