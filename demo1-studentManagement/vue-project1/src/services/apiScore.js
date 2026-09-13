import { faker } from '@faker-js/faker';
import { supabase } from '../../utils/supabase';

export async function getScoreList() {
  const { data: score, error } = await supabase
  .from('score')
  .select('*')
  if(error) {
    console.log(error.message);
    return;
  }
  return score;
}
export async function createScore(newScore) {
  const { data, error } = await supabase
    .from('score')
    .insert([newScore])
    .select()
    if(error) {
      console.log(error.message);
      return;
    }
    return data;
}

export async function getScoreDetail(studentId) {
  const { data: scoreDetail, error } = await supabase
  .from('score')
  .select('*')
  .eq('student_id', studentId)
  if(error) {
    console.log(error.message);
    return;
  }
  return scoreDetail;
}
export async function updateScore(studentId,newScoreData) { 
const { data, error } = await supabase
  .from('score')
  .update(newScoreData)
  .eq('student_id', studentId)
  .select()
  if(error){
    console.log(error.message)
    return;
  }
  return data;
}