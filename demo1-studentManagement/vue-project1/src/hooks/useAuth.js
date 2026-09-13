import{getUser} from '@/services/apiAuth.js'
//检查用户是否已登录，封装isAuthenticated函数
// 使用supabase的getUser的api拿user的数据有了就登录了返回改用户信息 没有就返回false
//isAuthenticated函数返回user的数据
export async function isAuthenticated() {
  
  const user = await getUser()
  if(user){
    return true
  }
  return false;
}
