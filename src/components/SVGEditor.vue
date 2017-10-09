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
          <div class="btn-group-vertical">
            <button class="btn btn-primary" @click="addRect">Rect</button>
            <button class="btn btn-primary" @click="addCircle">Circle</button>
            <button class="btn btn-primary" @click="addText">Text</button>
            <button class="btn btn-danger" @click="deleteShape" :disabled="!this.shapes.some(e => e.selected)">Delete</button>
            <button class="btn btn-secondary" @click="loadXml">Load XML</button>
            <button class="btn btn-secondary" @click="writeXml">Write XML</button>
            <button class="btn btn-info" @click="up" :disabled="!this.shapes.some(e => e.selected)">UP</button>
            <button class="btn btn-info" @click="down" :disabled="!this.shapes.some(e => e.selected)">DOWN</button>
            <button class="btn btn-info" @click="callRestAPI">REST API</button>
          </div>
        </div>
        <div class="row">
          <ImageCabinet
            :images="images"
          />
        </div>
        <div class="row">
          <label for="openImage">
            <span class="btn btn-primary">
              画像を開く
              <input type="file" id="openImage" class="openImage" @change="openImage">
            </span>
          </label>
        </div>
        <div class="row" v-for="(f, i) in uploadImages" :key="i">
          <img width="200" height="200" :src="f.preview">
          <button class="btn btn-danger" @click="uploadImage(f)">アップロード</button>
        </div>

        <div class="row">
          <h4>アプリの評価</h4>
          <p>
            <label for="evalBad">悪い</label>
            <input type="radio" v-model="evaluation" value="1" id="evalBad">
            <label for="evalNormal">普通</label>
            <input type="radio" v-model="evaluation" value="2" id="evalNormal">
            <label for="evalGood">良い</label>
            <input type="radio" v-model="evaluation" value="3" id="evalGood">
          </p>
          <p>あなたの評価は {{ evaluation }}</p>
        </div>
      </div>
    </div>
    <ModalAddText :display="displayModalAddText" @ok="addTextOk" @cancel="addTextCancel"/>
  </div>
</template>

<script>
import $ from 'jquery'
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
      uploadImages: [],
      displayModalAddText: false,
      evaluation: 3
    }
  },
  mounted: function () {
    this.shapes.push({
      id: `shape${this.shapes.length}`,
      type: 'image',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      path: cat,
      selected: false
    })
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
      this.shapes.forEach((e, i) => {
        e.id = `shape${i}`
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
    up: function () {
      if (this.shapes.length < 2) {
        return
      }
      const selectedIndex = findSelectedIndex(this.shapes)
      if (selectedIndex < 0 ||
        selectedIndex + 1 === this.shapes.length) {
        return
      }

      const target = this.shapes[selectedIndex]
      const swapped = this.shapes[selectedIndex + 1]
      this.shapes.splice(selectedIndex, 2, swapped, target)
    },
    down: function () {
      if (this.shapes.length < 2) {
        return
      }
      const selectedIndex = findSelectedIndex(this.shapes)
      if (selectedIndex <= 0) {
        return
      }

      const target = this.shapes[selectedIndex]
      const swapped = this.shapes[selectedIndex - 1]
      this.shapes.splice(selectedIndex - 1, 2, target, swapped)
    },
    callRestAPI: function () {
      $.ajax({
        method: 'get',
        url: 'http://localhost:8081/sample',
        cache: false
      }).done(data => {
        alert(data.message)
      })
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
      shape.rotation = pos.rotation
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
    },
    openImage: function (event) {
      const self = this
      console.log(this)
      Array.from(event.target.files).forEach(f => {
        const fileInfo = {
          file: f,
          preview: window.URL.createObjectURL(f)
        }
        self.uploadImages.push(fileInfo)
      })
    },
    uploadImage: function (file) {
      console.log(file)
      const form = new FormData()
      form.append('file', file.file) // 'file'はAPIのキーに合わせる
      console.log(file.file)
      $.ajax({
        method: 'post',
        url: 'http://localhost:8081/upload',
        data: form,
        processData: false,
        contentType: false
      })
    }
  },
  watch: {
    'evaluation': function (newVal, oldVal) {
      alert(`評価が変わりました${oldVal} -> ${newVal}`)
    }
  },
  components: {
    SVGCanvas,
    ModalAddText,
    ImageCabinet
  }
}

/**
 * Array#findIndexがIEで使えないのじ自作した
 */
function findSelectedIndex (shapes) {
  var index = -1
  shapes.some(function (e, i) {
    if (e.selected) {
      index = i
      return true
    }
  })
  return index
}
</script>

<style lang="scss" scoped>
.openImage {
  display: none;
}
</style>
