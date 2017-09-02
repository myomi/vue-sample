<template>
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
      :x="shape.x" :y="shape.y" :font-size="shape.fontSize">{{shape.text}}
    </text>
  </g>
</template>

<script>
import SVG from 'svg.js'
import 'svg.draggable.js'
import 'svg.select.js'
import 'svg.resize.js'

export default {
  props: [
    'shape'
  ],
  mounted: function () {
    SVG.adopt(this.$el).draggable()
  },
  methods: {
    selected: function (e) {
      this.target = e.target
      this.$emit('selected', e.target.id)
      e.stopPropagation()
    }
  },
  watch: {
    'shape.selected': function (val, oldVal) {
      if (val) {
        SVG.adopt(this.$el.querySelector('.shape')).selectize().resize()
      } else {
        SVG.adopt(this.$el.querySelector('.shape')).selectize(false).resize('stop')
      }
    }
  }
}
</script>

<style lang="scss">
// for svg.resize.js
.svg_select_boundingRect {
  stroke: #7ecf71;
  stroke-width: 2;
  stroke-dasharray: 3;
  pointer-events: auto !important;
}

.svg_select_points {
  fill: rgba(#daf1d7, 0.1);
  stroke: #7ecf71;
  stroke-width: 2;

  &_lt {
    cursor: nw-resize;
  }
  &_rt {
    cursor: ne-resize;
  }
  &_rb {
    cursor: se-resize;
  }
  &_lb {
    cursor: sw-resize;
  }
  &_t {
    cursor: n-resize;
  }
  &_r {
    cursor: e-resize;
  }
  &_b {
    cursor: s-resize;
  }
  &_l {
    cursor: w-resize;
  }
  &_rot {
    fill: #f4e6c2;
    stroke: #deb750;
    cursor: grab;
  }
}
</style>

<style lang="scss" scoped>
.shape {
  cursor: pointer;
}
</style>
