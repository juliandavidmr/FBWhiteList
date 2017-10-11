var app = new Vue({
  el: '#app',
  data: {
    message: 'Facebook whitelist',
    list: ['hasd'],
    time: (new Date()).toDateString(),
    text: ''
  },
  mounted: function () {
    this.list = JSON.parse(localStorage.getItem('list_fb'))
    console.log("Montado:", this.list)
  },
  methods: {
    getList: function () {
      return JSON.parse(localStorage.getItem('list_fb'))
    },
    setList: function (newList) {
      localStorage.setItem('list_fb', JSON.stringify(newList || this.list))
    },
    addWord: function () {
      if (this.text) {
        this.list = this.getList()
        this.list.push(this.text);
        this.setList()
        this.text = '';
      }      
    },
    deleteWord: function (word) {
      var list_temp = this.getList()
      if (list_temp && Array.isArray(list_temp)) {
        list_temp = list_temp.filter((it) => {
          if (it != word) {    
            return true
          }
        })
        this.setList(list_temp)
      }
      this.list = this.getList()
      console.log("Delete:", word)
    }
  }
})