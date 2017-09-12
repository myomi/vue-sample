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
        @resized="resized"
        @unselected="unselected"
        @dropped="dropped"
      />
      <div class="col-2">
        <div class="row">
          <div class="btn-group">
            <button class="btn btn-primary" @click="addRect">Rect</button>
            <button class="btn btn-primary" @click="addCircle">Circle</button>
            <button class="btn btn-primary" @click="addText">Text</button>
            <button class="btn btn-danger" @click="deleteShape" :disabled="!this.shapes.some(e => e.selected)">Delete</button>
            <button class="btn btn-secondary" @click="loadXml">Load XML</button>
            <button class="btn btn-secondary" @click="writeXml">Write XML</button>
          </div>
        </div>
        <div class="row">
          <ImageCabinet
            :images="images"
          />
        </div>
      </div>
    </div>
    <ModalAddText :display="displayModalAddText" @ok="addTextOk" @cancel="addTextCancel"/>
  </div>
</template>

<script>
import X2JS from 'x2js'
import SVGCanvas from './SVGCanvas'
import ModalAddText from './ModalAddText'
import ImageCabinet from './ImageCabinet'
import cat from '../assets/cat.jpg'
import dog from '../assets/dog.jpg'

export default {
  data: function () {
    return {
      shapes: [
      ],
      images: [
        cat,
        dog
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
    deleteShape: function () {
      this.shapes.some((e, i) => {
        if (e.selected) this.shapes.splice(i, 1)
      })
    },
    loadXml: function () {
      let x2js = new X2JS()
      let xmlText =
      `<info>
        <type>rect</type>
        <x>200</x>
        <y>150</y>
        <width>15</width>
        <height>30</height>
      </info>`
      let json = x2js.xml2js(xmlText).info
      json.id = `shape${this.shapes.length}`
      json.selected = false
      this.shapes.push(json)
    },
    writeXml: function () {
      let x2js = new X2JS()
      let xml = x2js.js2xml({
        information: {
          shape: this.shapes
        }
      })
      alert(xml)
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
      var shape = Array.find(this.shapes, e => e.id === pos.id)
      shape.x = pos.x
      shape.y = pos.y
    },
    resized: function (pos) {
      var shape = Array.find(this.shapes, e => e.id === pos.id)
      shape.x = pos.x
      shape.y = pos.y
      if (shape.type === 'circle') {
        shape.r = pos.r
      } else if (shape.type === 'text') {
        shape.fontSize = pos.fontSize
      } else if (shape.type === 'rect') {
        shape.width = pos.width
        shape.height = pos.height
      }
    },
    dropped: function (imagePath) {
      this.shapes.push({
        id: `shape${this.shapes.length}`,
        type: 'image',
        x: 10,
        y: 50,
        width: 300,
        height: 200,
        path: imagePath,
        selected: false
      })
    }
  },
  components: {
    SVGCanvas,
    ModalAddText,
    ImageCabinet
  }
}
</script>
