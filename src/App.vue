<template>
  <div id="app">
      <!--头部区域-->
      <Header></Header>
      <div class="tab">
        <router-link tag="div" to="/">商品</router-link>
        <router-link tag="div" to="/ratings">评论</router-link>
        <router-link tag="div" to="/seller">商家</router-link>
      </div>
      <!--内容区域-->
      <transition>
        <router-view :seller="seller">
        </router-view>
      </transition>


  </div>
</template>
<script>
  import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      seller: {},
    };
  },
  created() {
   this.getseller()
  },
  methods:{
    getseller(){
      this.$axios.get('/api/seller')
        .then(response=> {
          console.log(response.data.data);
          this.seller=response.data.data;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  }
}
</script>

<style lang="less" scoped>
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    div{
      flex: 1;
      text-align: center;
      font-size: 14px;
      display: block;
      color: rgb(77, 85, 93);
      &.router-link-exact-active{
        color: rgb(240, 20, 20)
      }
    }
  }
</style>
