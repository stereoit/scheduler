import React from 'react';
import {dateTimeFormat} from 'utils';

let SlotComponent = ({slot}) => {
  return (
    <div className="slot">
    <span>from: {slot.from.format(dateTimeFormat)} </span>
    <span>to: {slot.to.format(dateTimeFormat)}</span>
    </div>
  )
}

export default SlotComponent
