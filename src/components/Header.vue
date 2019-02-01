<template>
    <div>
      <header>
        <div class="content-wrapper">
          <div class="avatar">
            <img width="64" height="64" :src="sellerlist.avatar" />
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{sellerlist.name}}</span>
            </div>
            <div class="description">
              {{sellerlist.description}}/{{sellerlist.deliveryTime}}分钟送达
            </div>
            <div v-if="sellerlist.supports" class="support">
              <span class="text">{{sellerlist.supports[0].description}}</span>
            </div>
          </div>
          <div v-if="sellerlist.supports" class="supportcount" @click="showDtail">{{sellerlist.supports.length}}个</div>
        </div>
        <div class="bulletin-wrapper">
          <span class="bulletin-text">公告：{{sellerlist.bulletin}}</span>
        </div>
        <div class="bgimg">
          <img width="100%" :src="sellerlist.avatar" />
        </div>
        <!--弹层-->
        <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <div class="name">
                {{sellerlist.name}}
              </div>
              <div class="star-wraper"><star :size="48" :score="sellerlist.score"></star></div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="sellerlist.supports" class="supports">
                <li class="support-item" v-for="(item,index) in sellerlist.supports">
                  <span class="text">{{sellerlist.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">
                  {{sellerlist.bulletin}}
                </p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hideDetail">关闭</div>
        </div>
        </transition>
      </header>
    </div>
</template>

<script>
  import star from '@/components/custom/star'
    export default {
        name: "Header",
        data(){
          return{
            sellerlist:[],
            detailShow:false
          }
        },
        created(){
         this.getlist()
        },
        components:{
          star
        },
        methods:{
          getlist(){
            this.$axios.get('/api/seller')
              .then(response=> {
                this.sellerlist=response.data.data
              })
              .catch(function (response) {
                console.log(response);
              });
          },
          showDtail(){
            this.detailShow=true;
          },
          hideDetail(){
            this.detailShow=false;
          }
        }

    }
</script>

<style lang="less" scoped>
  header{
    position: relative;
    color: #ffffff;
    background: rgba(7,17,27,0.2);
    overflow: hidden;
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        .title{
          font-size: 16px;
          font-weight: bold;
        }
        .description{
          font-size: 12px;
          margin: 5px 0;
        }
        .support{
          .text{
            line-height: 12px;
            font-size: 12px;
          }
        }
      }
      .supportcount{
        position: absolute;
        right: 12px;
        bottom: 18px;
        background: rgba(0,0,0,0.5);
        border-radius: 5px;
        padding: 0px 8px;
        color: #ffffff;
        height: 24px;
        line-height: 24px;
        z-index: 9;
        font-size: 12px;
      }
    }
    .bulletin-wrapper{
      height: 28px;
      line-height: 28px;
      padding: 0px 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7,17,27,0.2);
      font-size: 12px;
    }
    .bgimg{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      z-index: 100;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: all 0.5s;
      background: rgba(7,17,27,0.8);
      &.fade-enter-active, .fade-leave-active {
        opacity: 1
      }
      &.fade-enter, .fade-leave-active {
        opacity: 0
      }
      .detail-wrapper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
          }
          .star-wraper{
            margin: 16px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text{
              padding: 0px 12px;
              font-size: 14px;
              font-weight: bold;
            }
          }
          .supports{
            width: 80%;
            margin: 0 auto;
            .support-item{
              margin-bottom: 12px;
              font-size: 14px;
              &:last-child{
                margin-bottom: 0px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: 0 auto;
            .content{
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 14px;
      }
    }
  }

</style>
