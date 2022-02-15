/* eslint-disable prettier/prettier */

export interface ITest {
  _id: string;

  job_applicant_id: string;
  status: string;
  notes?: string;
  interviewer?: string;
  typing_speed_score?: string;
  typing_accuracy_score?: string;
  accent_test_score?: string;
  attention_to_details_test?: string;
  multitasking_skills_test?: string;
  dictation_test?: string;
  professional_writing_email_test?: string;
  send_for_testGorilla_skype_interview?: string;
  testGorilla_invitation_date?: Date;
  assessment_completion_date?: Date;
  stage?: string;
  average_score?: string;
  personality_score?: string;
  attention_to_detail_score?: string;
  communication_score?: string;
  disc_profile_score?: string;
  english_score?: string;
  filed_out_only_once_from_ip_address?: string;
  webcam_enabled?: string;
  full_screen_mode_always_active?: string;
  mouse_always_in_assessment_window?: string;
  interviewer_rating?:string;
  interview_status?:string;

}
