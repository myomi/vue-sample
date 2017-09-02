<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">テキスト追加</h5>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <input type="text" class="form-control" v-model="text" id="ModalAddTextInput">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="ok">OK</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'

export default {
  props: [
    'display'
  ],
  data: function () {
    return {
      text: null
    }
  },
  mounted: function () {
    $(this.$el).modal({
      show: false
    }).on('shown.bs.modal', function () {
      $('#ModalAddTextInput').focus()
    })
  },
  watch: {
    display: function (val, oldVal) {
      var operation = val ? 'show' : 'hide'
      $(this.$el).modal(operation)
    }
  },
  methods: {
    ok: function () {
      let text = this.text
      this.text = null
      this.$emit('ok', text)
    },
    cancel: function () {
      this.text = null
      this.$emit('cancel')
    }
  }
}
</script>
