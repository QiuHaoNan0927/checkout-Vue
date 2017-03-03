new Vue({
  el: '.container',
  data: {
    addressList: [],
    listNumber: 3,
    checkIndex: 0,
    shipping: 1
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
      console.log(this.addressList);
    })
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get('data/address.json')
        .then(function(res) {
          _this.addressList = res.body.result;
        })
    },
    loadMore: function() {
      if (this.listNumber == 3) {
        this.listNumber = this.addressList.length;
      } else {
        this.listNumber = 3;
      }
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function(item, index) {
        if (item.addressId == addressId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      })
    },
    delList: function() {
      // var _this=this;
      // this.addressList.forEach(function(value, index) {
      //   _this.
      // })
      this.addressList.splice(this.index, 1)
    }
  },
  computed: {
    filterAddress: function() {
      return this.addressList.slice(0, this.listNumber);
    }
  }
})
