/* eslint-disable prettier/prettier */

import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateTestDto {


  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;


  @IsOptional()
  @IsString()
  public notes: string;

  @IsOptional()
  @IsString()
  public interviewer: string;

  @IsOptional()
  @IsString()
  public typing_speed_score: string;

  @IsOptional()
  @IsString()
  public typing_accuracy_score: string;

  @IsOptional()
  @IsString()
  public accent_test_score: string;

  @IsOptional()
  @IsString()
  public attention_to_details_test: string;

  @IsOptional()
  @IsString()
  public multitasking_skills_test: string;

  @IsOptional()
  @IsString()
  public dictation_test: string;

  @IsOptional()
   @IsString()
  public professional_writing_email_test: string;

  @IsOptional()
  @IsString()
  public send_for_testGorilla_skype_interview: string;

  @IsOptional()
  @IsDateString()
  public testGorilla_invitation_date: Date;

  @IsOptional()
  @IsDateString()
  public assessment_completion_date: Date;

  @IsOptional()
  @IsString()
  public stage: string;

  @IsOptional()
  @IsString()
  public average_score: string;

  @IsOptional()
  @IsString()
  public personality_score: string;

  @IsOptional()
  @IsString()
  public attention_to_detail_score: string;

  @IsOptional()
  @IsString()
  public communication_score: string;

  @IsOptional()
  @IsString()
  public disc_profile_score: string;

  @IsOptional()
  @IsString()
  public english_score: string;

  @IsOptional()
  @IsString()
  public filed_out_only_once_from_ip_address: string;

  @IsOptional()
@IsString()
  public webcam_enabled: string;

  @IsOptional()
@IsString()
  public full_screen_mode_always_active: string;

  @IsOptional()
@IsString()
  public mouse_always_in_assessment_window: string;

  @IsOptional()
  @IsString()
  public interviewer_rating: string;

 @IsOptional()
  @IsString()
  public interview_status: string;

}

export class UpdateTestDto {
  @IsString()
  public _id: string;

  @IsOptional()
  @IsString()
  public job_applicant_id: string;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public notes: string;


  @IsOptional()
  @IsString()
  public interviewer: string;

  @IsOptional()
  @IsString()
  public typing_speed_score: string;

  @IsOptional()
  @IsString()
  public typing_accuracy_score: string;

  @IsOptional()
  @IsString()
  public accent_test_score: string;

  @IsOptional()
  @IsString()
  public attention_to_details_test: string;

  @IsOptional()
  @IsString()
  public multitasking_skills_test: string;

  @IsOptional()
  @IsString()
  public dictation_test: string;

  @IsOptional()
  @IsString()
  public professional_writing_email_test: string;

  @IsOptional()
  @IsString()
  public send_for_testGorilla_skype_interview: string;

  @IsOptional()
  @IsDateString()
  public testGorilla_invitation_date: Date;

  @IsOptional()
  @IsDateString()
  public assessment_completion_date: Date;

  @IsOptional()
  @IsString()
  public stage: string;

  @IsOptional()
  @IsString()
  public average_score: string;

  @IsOptional()
  @IsString()
  public personality_score: string;

  @IsOptional()
  @IsString()
  public attention_to_detail_score: string;

  @IsOptional()
  @IsString()
  public communication_score: string;

  @IsOptional()
  @IsString()
  public disc_profile_score: string;

  @IsOptional()
  @IsString()
  public english_score: string;

  @IsOptional()
  @IsString()
  public filed_out_only_once_from_ip_address: string;

  @IsOptional()
  @IsString()
  public webcam_enabled: string;

  @IsOptional()
  @IsString()
  public full_screen_mode_always_active: string;

  @IsOptional()
  @IsString()
  public mouse_always_in_assessment_window: string;

  @IsOptional()
  @IsString()
  public interviewer_rating: string;

  @IsOptional()
  @IsString()
  public interview_status: string;
}
