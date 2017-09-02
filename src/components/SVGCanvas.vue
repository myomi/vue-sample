<template>
    <svg @click="unselected"
      width="400" height="400">
      <SVGShape v-for="s in shapes" :key="s.id"
        :shape="s"
        @selected="selected"/>
    </svg>
</template>

<script>
import SVGShape from './SVGShape'

export default {
  props: ['shapes'],
  methods: {
    selected: function (id) {
      this.$emit('selected', id)
    },
    unselected: function (e) {
      this.$emit('unselected')
    }
  },
  components: {
    SVGShape
  }
}
</script>

<style lang="scss" scoped>
svg {
  background-color: #ccc;
}
</style>
