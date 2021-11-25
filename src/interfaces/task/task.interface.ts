export  interface ITask{
  description?: String;
  assignedTo?: String;
  startDate?: String;
  endDate?: String;
  createdBy?: String;
  status?: String;
  toObject?: Function;
}
