<template>
    <div>
      <footer>
        <nav>
          <router-link tag="li" to="/">首页</router-link>
          <router-link tag="li" to="/member">会员</router-link>
          <router-link tag="li" to="/shop">购物车</router-link>
          <router-link tag="li" to="/search">搜索</router-link>
        </nav>
      </footer>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data () {
        return {

        }
      }
    }

</script>

<style lang="less" scoped>
  footer{
    position: fixed;
    height: 40px;
    width: 100%;
    background: #8f8f94;
    line-height: 40px;
    bottom: 0px;
    nav{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: center;
      li{
        width: 25%;
        color: #ffffff;
      }
    }

  }
</style>
