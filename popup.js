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
    addWord: function () {
      if (this.text) {
        this.list = JSON.parse(localStorage.getItem('list_fb'))
        this.list.push(this.text);
        localStorage.setItem('list_fb', JSON.stringify(this.list))
        this.text = '';
      }
    }
  }
})