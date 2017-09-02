<template>
  <div class="container">
    <div class="row">
      <h1>SVG Editor</h1>
    </div>
    <div class="row">
      <SVGCanvas class="col-10"
        :shapes="shapes"
        @selected="selected"
        @moved="moved"
        @unselected="unselected" />
      <div class="col-2">
        <div class="btn-group-vertical">
          <button class="btn btn-primary" @click="addRect">Rect</button>
          <button class="btn btn-primary" @click="addCircle">Circle</button>
          <button class="btn btn-primary" @click="addText">Text</button>
        </div>
      </div>
    </div>
    <ModalAddText :display="displayModalAddText" @ok="addTextOk" @cancel="addTextCancel"/>
  </div>
</template>


<script>
import SVGCanvas from './SVGCanvas'
import ModalAddText from './ModalAddText'

export default {
  data: function () {
    return {
      shapes: [
      ],
      displayModalAddText: false
    }
  },
  methods: {
    addRect: function () {
      this.shapes.push({
        id: `shape${this.shapes.length}`,
        type: 'rect',
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        selected: false
      })
    },
    addCircle: function () {
      this.shapes.push({
        id: `shape${this.shapes.length}`,
        type: 'circle',
        x: 100,
        y: 100,
        r: 100,
        selected: false
      })
    },
    addText: function () {
      this.displayModalAddText = true
    },
    addTextOk: function (text) {
      this.displayModalAddText = false
      if (text && text.length > 0) {
        this.shapes.push({
          id: `shape${this.shapes.length}`,
          type: 'text',
          x: 10,
          y: 50,
          fontSize: 24,
          text: text,
          selected: false
        })
      }
    },
    addTextCancel: function () {
      this.displayModalAddText = false
    },
    unselected: function () {
      this.shapes.forEach(e => {
        e.selected = false
      })
    },
    selected: function (id) {
      this.shapes.forEach(e => {
        e.selected = (e.id === id)
      })
    },
    moved: function (pos) {
      var shape = this.shapes.find(e => e.id === pos.id)
      shape.x = pos.x
      shape.y = pos.y
    }
  },
  components: {
    SVGCanvas,
    ModalAddText
  }
}
</script>
