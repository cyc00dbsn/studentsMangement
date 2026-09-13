import {insertStudents } from './services/apiStudent.js'
import {generateTeacher, insertTeachers} from './services/apiTeacher.js'
import { insertScores } from './services/apiScore.js'

// insertStudents(10)
const data = await insertScores(9)
console.log(data);

