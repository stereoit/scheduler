import React from 'react';
import {dateTimeFormat} from 'utils';

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

export default LessonComponent
