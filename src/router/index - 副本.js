import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeContainer from '@/components/tabbar/HomeContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import ShopContainer from '@/components/tabbar/ShopContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // ,
    {
      path: '/',
      name: 'HomeContainer',
      component: HomeContainer
    }
    ,
    {
      path: '/search',
      name: 'SearchContainer',
      component: SearchContainer
    }
    ,
    {
      path: '/shop',
      name: 'ShopContainer',
      component: ShopContainer
    }
    ,
    {
      path: '/member',
      name: 'MemberContainer',
      component: MemberContainer
    }

  ]
})
