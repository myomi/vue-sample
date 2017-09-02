<template>
  <div class="container">
    <div class="row">
      <h1>SVG Editor</h1>
    </div>
    <div class="row">
      <SVGCanvas :shapes="shapes" @selected="selected" @unselected="unselected" class="col-6"/>
      <div class="col-6">
        <button class="btn btn-default" @click="addRect">Rect</button>
        <button class="btn btn-default" @click="addText">Text</button>
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
    }
  },
  components: {
    SVGCanvas,
    ModalAddText
  }
}
</script>
