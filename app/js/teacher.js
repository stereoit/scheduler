import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const dateTimeFormat = "ddd, hA"

class Teacher {
  constructor(name) {
    this.name = name
    this.slots = []
    this.lessons = []
  }
}

class Student {
  constructor(name) {
    this.name = name
  }
}

class Lesson {
  constructor(when, duration, student, teacher) {
    this.when = when
    this.duration = duration
    this.student = student
    this.teacher = teacher
  }
}

class Slot {
  constructor(dt_from, dt_to) {
    this.from = dt_from
    this.to = dt_to
  }
}

let morning = moment().hour(8)

let slot1 = new Slot(morning, moment(morning).add(5, 'hours'))
let slot2 = new Slot(moment(morning).add(1, 'days'), moment(morning).add(1, 'days').add(3, 'hours'))
let slot3 = new Slot(moment(morning).add(2, 'days'), moment(morning).add(2, 'days').add(3, 'hours'))
let slot4 = new Slot(moment(morning).add(3, 'days'), moment(morning).add(3, 'days').add(5, 'hours'))
let slot5 = new Slot(moment(morning).add(4, 'days'), moment(morning).add(4, 'days').add(6, 'hours'))


let robert = new Student("Robert")
let harry = new Student("Harry")
let sebastian = new Student("Sebastian")

let students = [
  robert,
  harry,
  sebastian
]

let teacher = new Teacher("Samanha Fox");
teacher.slots.push(
  slot1,
  slot2,
  slot3,
  slot4,
  slot5
)

let lesson1 = new Lesson(morning, morning.add(30, 'minutes'), robert, teacher)

teacher.lessons.push(lesson1)

// React stuff

let SlotComponent = ({slot}) => {
  return (
    <div className="slot">
    <span>from: {slot.from.format(dateTimeFormat)} </span>
    <span>to: {slot.to.format(dateTimeFormat)}</span>
    </div>
  )
}

class SlotCreator extends React.Component {
  constructor(){
    this.state = {
      from_value: moment().format(dateTimeFormat),
      from_valid: true,
      to_value: moment().format(dateTimeFormat),
      to_valid: true
    }
    this.checkTime = this.checkTime.bind(this)
  }

  checkTime(input) {
    let isValid = moment(input.value, dateTimeFormat).isValid()
    // console.log(input, " value: ", input.value, isValid);
    if (input.getAttribute('data-tag') == "from") {
      this.setState({
        from_value: input.value,
        from_valid: isValid
      });
    } else {
      this.setState({
        to_value: input.value,
        to_valid: isValid
      });
    }
  }

  render() {
    let {onNewSlot} = this.props
    let {from_valid, from_value, to_valid, to_value} = this.state
    return (
      <div>
        <label>
          from:
          <input
            data-tag="from"
            ref={(c) => this.from = c}
            type="text"
            value={from_value}
            onChange={(event) => this.checkTime(event.target)}
          />
          { !from_valid && <span className="error">Not valid value </span>}
        </label>
        <label>
          to:
          <input
            data-tag="to"
            ref={(c) => this.to = c}
            type="text"
            value={to_value}
            onChange={(event) => this.checkTime(event.target)}
          />
        { !to_valid && <span className="error">Not valid value </span>}
        </label>
        { (from_valid && to_valid) &&
          <button onClick={() => {
              onNewSlot({
                from: moment(from_value, dateTimeFormat).format("X"),
                to: moment(to_value, dateTimeFormat).format("X")
              })
            }
          } >Create</button>
        }
      </div>
    )
  }
}

class LessonComponent extends React.Component {
  render() {
    let {lesson} = this.props
    return (
      <div className="lesson">
        <ul>
          <li>when: {lesson.when.format(dateTimeFormat)}</li>
          <li>studen: {lesson.student.name}</li>
        </ul>
      </div>
    )
  }
}

class TeacherApp extends React.Component {
  constructor() {
    this.newSlotHandler = this.newSlotHandler.bind(this)
  }

  newSlotHandler(slot) {
    console.log("newSlotHandler: ", slot);
    let {teacher} = this.props
    let _slot = new Slot(moment.unix(slot.from), moment.unix(slot.to))
    teacher.slots.push(_slot)
    this.forceUpdate()
  }

  render() {
    let {teacher} = this.props
    return (
      <div>
        <h2>Hello {teacher.name}</h2>
        <p>Your availability</p>
        {teacher.slots.map( (slot, id) =>   <SlotComponent slot={slot} key={id} />  )}
        <p>Add new availability block </p>
        <SlotCreator onNewSlot={this.newSlotHandler}/>
        <p>Booked lessongs</p>
        {teacher.lessons.map( (lesson, id) =>   <LessonComponent lesson={lesson} key={id} />  )}
      </div>
    )
  }
}


ReactDOM.render(<TeacherApp teacher={teacher} />, document.getElementById('teacherApp'));
console.log("TeacherApp started");
