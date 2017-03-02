new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false
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
    },
    changeMoney: function(product, way) {
      if (way > 0) {
        product.productQuentity++;
      } else {
        product.productQuentity--;
        if (product.productQuentity < 1) {
          product.productQuentity = 1;
        }
      }
    },
    selectedProdect: function(item) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true);
        // Vue.set(item,'checked',true);
      } else {
        item.checked = !item.checked;
      }
    },
    checkAll: function(flag) {
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function(item, index) {
        if (typeof item.checked === 'undefined') {
          _this.$set(item, 'checked', _this.checkAllFlag);
        } else {
          item.checked = _this.checkAllFlag;
        }
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
