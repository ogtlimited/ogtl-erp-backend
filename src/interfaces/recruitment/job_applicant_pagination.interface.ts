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






