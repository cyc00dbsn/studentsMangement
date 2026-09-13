import { supabase } from '../../utils/supabase';
export async function createTeacher(teacherId) {
  const { error } = await supabase
    .from('teacher')
    .insert([teacher])
    if(error){
      console.log(error.message)
      return;
    }
}
export async function getTeacherByTeacherId(teacherId) {
  const { data: teacher, error } = await supabase
    .from('teacher')
    .select('class_in_charge')
    .eq('teacher_id', teacherId);
    if(error){
      console.log(error.message)
      return;
    }
  return teacher;
}

