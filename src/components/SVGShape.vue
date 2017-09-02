<template>
  <g class="shapeGroup">
    <rect v-if="shape.type === 'rect'"
      @click="selected"
      :id="shape.id"
      class="shape"
      fill="white"
      :x="shape.x" :y="shape.y" :width="shape.width" :height="shape.height"
    />
    <circle v-if="shape.type === 'circle'"
      @click="selected"
      :id="shape.id"
      class="shape"
      fill="white"
      :cx="shape.x" :cy="shape.y" :r="shape.r"
    />
    <text v-if="shape.type === 'text'"
      @click="selected"
      :id="shape.id"
      class="shape"
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
    let self = this
    let shape = this.$el.querySelector('.shape')
    let startX
    let startY
    // shapeをdraggableにした場合、select中はdragできなかった。
    // select中もドラッグ可能にするために、gタグをdraggableにする。
    SVG.adopt(this.$el)
      .draggable()
      .on('dragstart', function (e) {
        startX = e.detail.p.x
        startY = e.detail.p.y
      })
      .on('dragend', function (e) {
        let orgX, orgY
        if (self.shape.type === 'circle') {
          orgX = parseFloat(shape.getAttribute('cx'))
          orgY = parseFloat(shape.getAttribute('cy'))
        } else {
          orgX = parseFloat(shape.getAttribute('x'))
          orgY = parseFloat(shape.getAttribute('y'))
        }

        // shapのの代わりにgタグをdraggableにしたせいで、移動後の座標計算が必要
        self.$emit('moved', {
          id: shape.getAttribute('id'),
          x: orgX + e.detail.p.x - startX,
          y: orgY + e.detail.p.y - startY
        })
      })
  },
  updated: function () {
    // gタグをdraggablににした場合、x,y座標ではなくgタグのtransformが変更される
    // モデルの座をを更新したらgタののtransform属性を消去しないとmoveが2倍うごいてしまう
    this.$el.removeAttribute('transform')
  },
  methods: {
    /**
     * Shapeが選択されたとき
     * @argument e イベント
     */
    selected: function (e) {
      this.target = e.target
      this.$emit('selected', e.target.id)
      e.stopPropagation()
    }
  },
  watch: {
    'shape.selected': function (val, oldVal) {
      let shape = this.$el.querySelector('.shape')
      let self = this
      if (val) {
        SVG.adopt(shape)
          .selectize()
          .resize()
          .on('resizedone', function (e) {
            let x, y, width, height, fontSize, r
            if (self.shape.type === 'text') {
              x = parseFloat(shape.getAttribute('x'))
              y = parseFloat(shape.getAttribute('y'))
              fontSize = parseFloat(shape.getAttribute('font-size'))
            } else if (self.shape.type === 'rect') {
              x = parseFloat(shape.getAttribute('x'))
              y = parseFloat(shape.getAttribute('y'))
              width = parseFloat(shape.getAttribute('width'))
              height = parseFloat(shape.getAttribute('height'))
            } else if (self.shape.type === 'circle') {
              x = parseFloat(shape.getAttribute('cx'))
              y = parseFloat(shape.getAttribute('cy'))
              r = parseFloat(shape.getAttribute('r'))
            }
            self.$emit('resized', {
              id: shape.getAttribute('id'),
              x: x,
              y: y,
              width: width,
              height: height,
              r: r,
              fontSize: fontSize
            })
          })
      } else {
        SVG.adopt(shape).selectize(false).resize('stop').off('resizedone')
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
