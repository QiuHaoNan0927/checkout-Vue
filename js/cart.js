new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0
  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    })
  },
  methods: {
    cartView: function() {
      var _this = this;
      this.$http.get("data/cart.json", {
          "id": 123
        })
        .then(function(res) {
          _this.productList = res.body.result.list;
          _this.totalMoney = res.body.result.totalMoney;
        })
    }
  },
  filters: {
    formatMoney: function(value) {
      return '￥ ' + value.toFixed(2);
    }
  }
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return '￥ ' + value.toFixed(2) + type;
})
