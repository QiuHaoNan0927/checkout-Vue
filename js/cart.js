new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    checkAllFlag: false,
    delFlag: false,
    curPro: '',
    curIndex: '',
    hrefFlag: false
  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    })
  },
  methods: {
    cartView: function() {
      var _this = this;
      this.$http.get("data/cart.json")
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
      this.calcTotalPrice();
    },
    selectedProdect: function(item) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true);
        // Vue.set(item,'checked',true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
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
      this.calcTotalPrice()
    },
    calcTotalPrice: function() {
      var _this = this;
      this.totalMoney = 0;
      this.productList.forEach(function(item, index) {
        if (item.checked) {
          _this.totalMoney += item.productQuentity * item.productPrice;
        }
      })
    },
    delConfirm: function(item, index) {
      this.delFlag = true;
      this.curPro = item;
      this.curIndex = index;
    },
    delPro: function() {
      this.delFlag = false;
      this.productList.splice(this.index, 1);
      // 或者使用indexOf获取索引值
      // var index = this.productList.indexOf(this.curPro);
      // this.productList.splice(index, 1);
    },
    openHref: function() {
      if (this.totalMoney === 0) {
        this.hrefFlag = true;
      } else {
        window.location.href = './address.html';
      }
    }
  },
  // computed: {
  //   calcTotalPrice: function() {
  //     var _this = this;
  //     this.productList.forEach(function(item, index) {
  //       if (item.checked) {
  //         // _this.totalMoney = 0;
  //         return _this.totalMoney += item.productQuentity * item.productPrice;
  //       }
  //     })
  //   }
  //
  // },
  filters: {
    formatMoney: function(value, type) {
      return '￥ ' + value.toFixed(2) + type;
    }
  }
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return '￥ ' + value.toFixed(2) + type;
})
