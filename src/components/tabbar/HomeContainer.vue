<template>
  <div class="container">
    <!--<lunbotu :lunbolist="lunbotus" :isfull="true"></lunbotu>-->

  </div>
</template>

<script>
  import lunbotu from '@/components/custom/lunbotu'
  export default {
    name: 'HomeContainer',
    data(){
      return{
        lunbotus:[],
        json:require('@/ratings.json'),
      }
    },
    components:{
      lunbotu
    },
    created(){
      this.getlunbotu()
    },
    methods:{
      getlunbotu(){
        this.$axios.get('/api/seller')
          .then(response=> {
            this.lunbotus=response.data.data.pics
          })
          .catch(function (response) {
            console.log(response);
          });
      },
    }
  }
</script>

<style lang="less" scoped>
 .container{

 }
</style>
