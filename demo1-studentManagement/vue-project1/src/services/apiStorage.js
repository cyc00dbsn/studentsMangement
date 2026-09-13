import { faker } from '@faker-js/faker';
import { supabase } from '../../utils/supabase';
// **Supabase Storage 文件上传函数：上传用户头像**
export async function uploadAvatar(avatarFile,newAvatarFileName) {
  const { data, error } = await supabase
    .storage
    .from('avatar')
    .upload(`public/${newAvatarFileName}`, avatarFile, {
      cacheControl: '3600', //浏览器缓存时间，单位秒，图片缓存 1 小时。
      upsert: false  //如果路径已经存在文件，直接报错，**禁止覆盖**改为true可以覆盖。
    })
    if(error) {
      console.log(error.message);
      return;
    }
 


  return ;
}