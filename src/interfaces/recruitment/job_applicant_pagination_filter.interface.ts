/* eslint-disable prettier/prettier */
export interface IJobApplicantPagination {
  next?:{
    page:number,
    limit:number
  },
  previous?:{
    page:number,
    limit:number
  },
  numberOfPages?:number
}


export interface IJobApplicantFilteration{
  $or? : any;
  $and? : any;
  interview_status?:string;
  process_stage?:string;
  rep_sieving_call?: string
}






