<template>
  <div class="goods">
    <div class="menu-wraper" ref="menuwrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}"
        @click="selectMenu(index)">
          <span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wraper" ref="foodwrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wraper">
                  <cartcontrol v-on:cart-add="_drop" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--底部区域-->
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  export default {
    props:{
      seller:{
        type:Object,
      }
    },
    components:{
      shopcart,
      cartcontrol
    },
    data(){
      return{
        goods:[],
        listHeight:[], //区间高度的数组
        scrollY:0
      }
    },
    computed:{
      //当前索引值的高度
      currentIndex(){
        for (let i=0;i<this.listHeight.length;i++){
          let height1=this.listHeight[i];
          let height2=this.listHeight[i+1];
          if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }
          })
        })
        return foods
      }
    },
    created(){
      this.getgoods()
    },

    methods:{
      getgoods(){
        this.$axios.get('/api/goods')
          .then(response=> {
            this.goods=response.data.data;
            //异步操作，这样才能先计算高度再滚动
            this.$nextTick(() => {
              this.initScroll();
              this.calculateHeight();
            });
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      initScroll(){
        this.menuScroll=new BScroll(this.$refs.menuwrapper,{
          click:true
        })
        this.foodScroll=new BScroll(this.$refs.foodwrapper,{
          probeType:3, //探针的效果
          click:true
        })
        this.foodScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y));
        })
      },
      calculateHeight(){
        let foodlist=this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<foodlist.length;i++){
          let item=foodlist[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index){
        let foodlist=this.$refs.foodwrapper.getElementsByClassName('food-list-hook');
        let el=foodlist[index]
        this.foodScroll.scrollToElement(el,300)
      },
      _drop(target){
        this.$refs.shopcart.drop(target)
      }
    }
  }
</script>
<style lang="less">
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    height: calc(100% - 174px);
    overflow: hidden;
    .menu-wraper{
      flex: 0 0 80px;
      width: 80px;
      height: calc(100vh - 222px);
      overflow: hidden;
      background: #f3f5f7;
      ul{
        height: auto;
      }
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current{
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background: #ffffff;
          font-weight: bold;
          .text{
            border-bottom:0px;
          }
        }
        .text{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          border-bottom: 1px solid rgba(7,17,27,0.2);
        }
      }
    }
    .foods-wraper{
      flex: 1;
      height: calc(100vh - 222px);
      overflow: hidden;
      ul{
        height: auto;
      }
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgba(147,153,159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.2);
        position: relative;
        &:last-child{
          border-bottom: 0px;
          margin-bottom: 0px;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            font-size: 14px;
            margin: 2px 0 8px 0px;
            height: 14px;
            line-height: 14px;
            color: rgb(7,17,27);
          }
          .desc,.extra{
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 10px;
            color: rgba(147,153,159);
          }
          .extra{
            margin-bottom: 0;
            .count{
              margin-right: 12px;
            }
          }
          .price{
            font-weight: bold;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgba(147,153,159);
            }
          }
          .cartcontrol-wraper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }

  }
</style>
