
import { faker } from '@faker-js/faker';
import { supabase } from '../utils/supabase.js';

const sub = [
  "Math",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Art",
  "Music",
  "Computer Science",
  "Business",
  "Accounting",
];
function generateClass(){
  const classNum= faker.number.int({min:1,max:12});
  const  grade= faker.number.int({min:1,max:12});
  return `${classNum}|${grade}`;
}

export function generateScore(){
  const semesterSeason = faker.number.int({ min:1,max:4 }) % 2 ? "spring" : "Fall";
  const semesterYear = faker.number.int({min:2000,max:new Date().getFullYear()});
  const student_id = faker.number.int({min:1,max:10});
  const score = faker.number.int({min:0,max:100});
  const subject = faker.helpers.arrayElement(sub)
  return {
    semesterSeason,
    semesterYear,
    student_id,
    score,
    subject
  }
}


export function generateScores(count = 5){
  return new Array(count).fill(0).map(()=>generateScore())
}

export async function insertScores(count = 5){
  const studentScores = generateScores(count)
  const { data, error } = await supabase
    .from('score')
    .insert(studentScores)
    .select()

  if(error){
    console.log(error.message)
    return;
  }  
  return data;
}