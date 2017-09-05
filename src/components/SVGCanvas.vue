<template>
    <svg xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="unselected"
      width="400" height="400"
      @dragover="dragover"
      @drop="drop"
    >
      <SVGShape v-for="s in shapes" :key="s.id"
        :shape="s"
        @selected="selected"
        @moved="moved"
        @resized="resized"
      />
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
    moved: function (pos) {
      this.$emit('moved', pos)
    },
    resized: function (pos) {
      this.$emit('resized', pos)
    },
    unselected: function (e) {
      this.$emit('unselected')
    },
    dragover: function (e) {
      e.preventDefault()
    },
    drop: function (e) {
      e.preventDefault()
      let imagePath = e.dataTransfer.getData('imagePath')
      if (imagePath) {
        this.$emit('dropped', imagePath)
      }
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
