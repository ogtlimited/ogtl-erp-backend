const moment = require('moment');

const calculateLateness = (clock_in_time, resumption_time) => {
  // calculates the hourly deductions
  const formatDate = str => {
    const hrs = str.split(':')[0];
    const mins = str.split(':')[1];
    return hrs * 3600 + mins * 60;
  };
  const clock_in = formatDate(clock_in_time);
  const resume = formatDate(resumption_time);
  if (clock_in > resume) {
    const calc = (clock_in - resume) / 60 / 60;
    const remainder = ((clock_in - resume) / 60) % 60;
    if (remainder > 0) {
      return parseInt(calc + 1);
    } else {
      return calc;
    }
  } else {
    return 0;
  }
};

const getWorkTime = (userStartTime: Date, userEndTime: Date, resumptionTime?) => {
  const result = {};
  const startTime = moment(userStartTime);
  const endTime = moment(userEndTime);
  const timeDifference = moment.duration(moment(endTime).diff(startTime));
  const { hours, minutes } = timeDifference._data;
  result.hoursWorked = hours;
  result.minutesWorked = minutes;
  if (resumptionTime != undefined) {
    const timeDeductions = calculateLateness(startTime.format('hh:mm'), resumptionTime);
    result.timeDeductions = timeDeductions;
  }
  return result;
};



export {getWorkTime, calculateLateness} 
