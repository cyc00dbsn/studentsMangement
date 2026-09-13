import { faker } from '@faker-js/faker';
import { supabase } from '../../utils/supabase';
export async function getStudentList(teacherId) {
  const { data: student, error } = await supabase
    .from('student')
    .select('*')
    .eq('teacher_id', teacherId)
    if(error){
      console.log(error.message)
      return;
    }
    return student;
}
export async function getStudentById(studentId) {
  const { data: students, error } = await supabase
    .from('student')
    .select('*')
    .eq('student_id', studentId)
    if(error){
      console.log(error.message)
      return;
    }
    return students[0];
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from('student')
    .insert([student])
    .select();
    if(error){
      console.log(error.message)
      return;
    }
  return data;
}

export async function updateStudent(studentId,newStudentData) { 
const { data, error } = await supabase
  .from('student')
  .update(newStudentData)
  .eq('student_id', studentId)
  .select()
  if(error){
    console.log(error.message)
    return;
  }
  return data;
}




