<template>
  <ul id='pipes'>
    <template
    v-for="leftposition in initLeftPositon">
    <li is='pipe' :left="leftposition"></li>
    </template>
  </ul>
</template>

<script>
import pipe from './pipe'

export default {
  components: {
    pipe
  },
  data () {
    return {
      initLeftPositon: [100, 400]
    }
  }
}

</script>

<style>
#pipes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>