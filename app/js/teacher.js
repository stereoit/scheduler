import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Lesson from 'models/Lesson';
import Teacher from 'models/Teacher';
import Student from 'models/Student';
import Slot from 'models/Slot';

import TeacherView from 'views/TeacherView';

let morning = moment().hour(8)

// definition of time slots
let slot1 = new Slot(morning, moment(morning).add(5, 'hours'))
let slot2 = new Slot(moment(morning).add(1, 'days'), moment(morning).add(1, 'days').add(3, 'hours'))
let slot3 = new Slot(moment(morning).add(2, 'days'), moment(morning).add(2, 'days').add(3, 'hours'))
let slot4 = new Slot(moment(morning).add(3, 'days'), moment(morning).add(3, 'days').add(5, 'hours'))
let slot5 = new Slot(moment(morning).add(4, 'days'), moment(morning).add(4, 'days').add(6, 'hours'))

// dummy students definition
let robert = new Student("Robert")
let harry = new Student("Harry")
let sebastian = new Student("Sebastian")
let students = [robert,harry,sebastian]

// sample teacher
let teacher = new Teacher("Samanha Fox");
teacher.slots.push(
  slot1,
  slot2,
  slot3,
  slot4,
  slot5
)

let lesson1 = new Lesson(morning, morning.add(30, 'minutes'), robert, teacher)
// at this moment I hack it there, TODO: proper resource management
teacher.lessons.push(lesson1)

// React stuff
ReactDOM.render(<TeacherView teacher={teacher} />, document.getElementById('teacherApp'));
console.log("TeacherApp started");
