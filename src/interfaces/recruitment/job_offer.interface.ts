export enum JobOfferStatus {
  AWAITING_RESPONSE,
  ACCEPTED,
  REJECTED
}
export interface JobOffer {
  job_applicant_id: string;
  status: JobOfferStatus;
  offer_date: Date;
  designation_id: string;
  job_offer_terms: string[];
  terms_and_conditions?: string;

}
