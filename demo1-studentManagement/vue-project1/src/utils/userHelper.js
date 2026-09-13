export function getUserId(){
  const token = import.meta.env.VITE_SUPABASE_TOKEN
  const userToken = JSON.parse(localStorage.getItem(token))
  return userToken.user.id 
}
