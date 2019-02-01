<template>
  <div class="carcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner fa fa-minus-circle"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add fa fa-plus-circle" @click="addCart"></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props:{
      food:{
        type:Object,
      }
    },
    created(){

    },
    methods:{
      addCart(event){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }
        else {
          this.food.count++
        }
        this.$emit('cart-add',event.target)
      },
      decreaseCart(){
        if(this.food.count){
          this.food.count--
        }
      }
    }
  }
</script>
<style lang="less">
  .carcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
      &.move-transition{
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner{
          transform: rotate(0);
        }
      }
      &.move-enter, &.move-leave-to{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg)
        }
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,154,159);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    }
  }
</style>
