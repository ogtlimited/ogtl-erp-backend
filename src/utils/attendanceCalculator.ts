/* eslint-disable prettier/prettier */
import moment = require('moment');

interface resultInterface {
  hoursWorked?: Number;
  minutesWorked?: Number;
  timeDeductions?: Number;
}

const calculateLateness = (clock_in_time, resumption_time) => {
  // calculates the hourly deductions
  const formatDate = str => {
    const hrs = str.split(':')[0];
    const mins = str.split(':')[1];
    return hrs * 3600 + mins * 60;
  };
  // console.log(clock_in_time, resumption_time);

  const clock_in = formatDate(clock_in_time);
  const resume = formatDate(resumption_time);
  // console.log(clock_in, resume)
  // console.log(clock_in_time, resumption_time)
  if (clock_in > resume) {
    const calc = (clock_in - resume) / 60 / 60;
    const remainder = ((clock_in - resume) / 60) % 60;
    if (remainder > 0) {
      return calc + 1;
    } else {
      return calc;
    }
  } else {
    return 0;
  }
};

const getWorkTime = (userStartTime: any, userEndTime: any, resumptionTime?) => {
  const result: resultInterface = {};
  const startTime = moment(userStartTime).subtract(1, 'hour');
  const endTime = moment(userEndTime).subtract(1, 'hour');

  const timeDifference = moment.duration(moment(endTime).diff(startTime));
  const { hours, minutes } = timeDifference['_data'];
  result.hoursWorked = Number(hours);
  result.minutesWorked = Number(minutes);
  if (resumptionTime != undefined) {
    const timeDeductions = calculateLateness(startTime.format('hh:mm'), resumptionTime);
    result.timeDeductions = Math.round(timeDeductions);
  }
  return result;
};

export { getWorkTime, calculateLateness };
