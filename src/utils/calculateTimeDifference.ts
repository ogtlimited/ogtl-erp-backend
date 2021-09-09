function SumHours(startTime:any, endTime:any) {
  let diff:Number = 0 ;
  if (startTime && endTime) {
    startTime = ConvertToSeconds(startTime);
    endTime = ConvertToSeconds(endTime);
    diff = Math.abs( endTime - startTime ) ;
    return secondsTohhmmss(diff)
  }

  function ConvertToSeconds(time) {
    let splitTime = time.split(":");
    return splitTime[0] * 3600 + splitTime[1] * 60;
  }

  function secondsTohhmmss(secs) {
    let hours = parseInt(String(secs / 3600));
    let seconds = parseInt(String(secs % 3600));
    let minutes = parseInt(String(seconds / 60)) ;
    return hours;
  }
}
export {SumHours}
