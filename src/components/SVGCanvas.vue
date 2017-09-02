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
import SVG from 'svg.js'
import 'svg.draggable.js'

export default {
  props: ['shapes'],
  mounted: function () {
    SVG.select('.shape').draggable()
  },
  updated: function () {
    SVG.select('.shape').draggable()
  },
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
