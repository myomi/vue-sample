<template>
  <div>
    <div class="card" v-for="image in images" :key="image">
      <div class="card-body" draggable="true">
        <img
          class="thumbnail"
          draggable="true"
          :src="image"
          @dragstart="dragstart(image, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'images'
  ],
  methods: {
    dragstart: function (imagePath, e) {
      e.dataTransfer.setData('text', imagePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  max-width: 100px;
  height: auto;
  cursor: pointer;
}
</style>
