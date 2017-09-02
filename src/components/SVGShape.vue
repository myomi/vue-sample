<<template>
  <g class="shapeGroup">
    <rect v-if="shape.type === 'rect'"
      @click="selected"
      :id="shape.id"
      class="shape"
      :class="{ isSelected: shape.selected }"
      fill="white"
      :x="shape.x" :y="shape.y" :width="shape.width" :height="shape.height"
    />
    <text v-if="shape.type === 'text'"
      @click="selected"
      :id="shape.id"
      class="shape"
      :class="{ isSelected: shape.selected }"
      :x="shape.x" :y="shape.y" :font-size="shape.fontSize">{{shape.text}}</text>
    <!-- Sizer -->
    <g v-if="shape.selected">
      <line class="sizer n" :x1="shape.x" :y1="shape.y" :x2="shape.x + shape.width" :y2="shape.y"/>
      <line class="sizer e" :x1="shape.x + shape.width" :y1="shape.y" :x2="shape.x + shape.width" :y2="shape.y + shape.height"/>
      <line class="sizer s" :x1="shape.x" :y1="shape.y + shape.height" :x2="shape.x + shape.width" :y2="shape.y + shape.height"/>
      <line class="sizer w" :x1="shape.x" :y1="shape.y" :x2="shape.x" :y2="shape.y + shape.height"/>
      <circle class="sizer nw" :cx="shape.x"               :cy="shape.y" r="5"/>
      <circle class="sizer ne" :cx="shape.x + shape.width" :cy="shape.y" r="5"/>
      <circle class="sizer sw" :cx="shape.x"               :cy="shape.y + shape.height" r="5"/>
      <circle class="sizer se" :cx="shape.x + shape.width" :cy="shape.y + shape.height" r="5"/>
    </g>
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

line.sizer {
  stroke-dasharray: 3;
}

.sizer {
  fill: #daf1d7;
  stroke: #7ecf71;
  stroke-width: 2;

  &.n {
    cursor: n-resize;
  }
  &.e {
    cursor: e-resize;
  }
  &.s {
    cursor: s-resize;
  }
  &.w {
    cursor: w-resize;
  }
  &.nw {
    cursor: nw-resize;
  }
  &.ne {
    cursor: ne-resize;
  }
  &.sw {
    cursor: sw-resize;
  }
  &.se {
    cursor: se-resize;
  }
}
</style>
