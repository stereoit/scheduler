import React from 'react';
import moment from 'moment';
import {dateTimeFormat} from 'utils';

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

export default SlotCreator
