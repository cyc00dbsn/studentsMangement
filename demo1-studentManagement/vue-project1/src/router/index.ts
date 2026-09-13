import { createRouter, createWebHistory } from 'vue-router'
import {isAuthenticated} from '@/hooks/useAuth.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path:'/Login',
      name:'login',
      component:()=>import('@/feature/auth/Login.vue')
    },
    {
      path:'/Sinup',
      name:'sinup',
      component:()=>import('@/feature/auth/Sinup.vue')
    },
  
    {
      path:'/Home',
      name:'home',
      component:()=>import('@/views/HomeView.vue'),
      children:[
        {
          path:'StudentList',
          children:[
            {
              path:'student',
              name:'student',
              component:()=>import('@/feature/Student/StudentList.vue')
            },
            {
              path:':id',
              name:'student-edit',
              component:()=>import('@/feature/Student/StudentEdit.vue')
            }

          ]
        },
        {
          path:'ScoreList',
          children:[
            {
              path:'score' ,
              name:'score',
              component:()=>import('@/feature/ScoreList/ScoreList.vue')
            },
            {
              path:':id',
              name:'score-edit',
              component:()=>import('@/feature/ScoreList/ScoreEdit.vue')
            },
            {
              path:'scoreUpload',
              name:'scoreupload',
              component:()=>import('@/feature/ScoreList/ScoreUpload.vue')
            },
            {
              path:'studentAdd',
              name:'studentadd',
              component:()=>import('@/feature/Student/StudentAdd.vue')
            }

            
          ]
        },
        {
        path:'/Info',
        name:'info',
        component:()=>import('@/feature/user/Info.vue')
        },

      ]
    },
    {
    path: '/',         // 打开项目默认地址
    redirect: {name:'score'}  // 自动跳转到 
    },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/ui/NotFound404.vue')
    }

  ],

})
// 路由守卫，检查用户是否已登录
router.beforeEach(async (to) => {
  const routeName = to.name ;
  if(routeName!=='login'&&routeName!=='sinup'){
    const islogin = await isAuthenticated()
    if (!islogin){
      router.push({name:'login'})
      return
    }
  }
})
export default router
