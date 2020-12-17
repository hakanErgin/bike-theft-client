import React, {Component} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DatePicker extends Component {
  state = {
    date: new Date(),
  };

  render() {
    const {date} = this.state;

    return (
      <DateTimePicker
        value={date}
        mode="default"
        display="default"
        onChange={(date) => this.setState({date})}
      />
    );
  }
}
