const vm = new Vue({
  el: '#app',
  data: {
    item: '',
    editId: null,
    memos: []
  },
  computed: {
    changeButtonText () {
      return this.editId === null ? '追加' : '完了'
    }
  },
  watch: {
    memos: {
      handler () {
        localStorage.setItem('memos', JSON.stringify(this.memos))
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.memos = JSON.parse(localStorage.getItem('memos')) || []
    })
  },
  methods: {
    addItem () {
      if (!this.item) return
      const item = {
        id: new Date().getTime().toString(),
        body: this.item
      }
      this.memos.push(item)
      this.item = ''
    },
    deleteItem (targetId) {
      const deleteId = this.memos.findIndex(({ id }) => id === targetId)
      this.memos.splice(deleteId, 1)
    },
    setItems () {
      if (!this.item) return
      if (this.editId === null) {
        const item = {
          id: new Date().getTime().toString(),
          body: this.item
        }
        this.memos.push(item)
      } else {
        this.memos.splice(this.editId, 1, {
          id: this.memos[this.editId].id,
          body: this.item
        })
      }
      this.cancel()
    },
    cancel () {
      this.item = ''
      this.editId = null
    },
    editItem (targetId) {
      this.editId = this.memos.findIndex(({ id }) => id === targetId)
      this.item = this.memos[this.editId].body
      this.$refs.editor.focus()
    }
  }
})
