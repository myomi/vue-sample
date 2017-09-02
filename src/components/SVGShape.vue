<<template>
  <g>
    <rect v-if="shape.type === 'rect'"
      @click="selected"
      :id="shape.id"
      class="shape"
      :class="{ isSelected: shape.selected }"
      :x="shape.x" :y="shape.y" :width="shape.width" :height="shape.height"
    />
    <text v-if="shape.type === 'text'"
      @click="selected"
      :id="shape.id"
      class="shape"
      :class="{ isSelected: shape.selected }"
      :x="shape.x" :y="shape.y" :font-size="shape.fontSize">{{shape.text}}</text>
  </g>
</template>

<script>
export default {
  props: [
    'shape'
  ],
  methods: {
    selected: function (e) {
      this.target = e.target
      this.$emit('selected', e.target.id)
      e.stopPropagation()
    }
  }
}
</script>


<style lang="scss" scoped>
.shape {
  cursor: pointer;
}

.isSelected {
  fill: red;
}
</style>
