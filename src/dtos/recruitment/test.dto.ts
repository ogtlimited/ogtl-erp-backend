/* eslint-disable prettier/prettier */

import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  public test_type: string;

  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;

  @IsDateString()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;

  @IsString()
  public interviewer: string;

  @IsString()
  public email_address: string;

  @IsString()
  public typing_speed_score: string;

  @IsString()
  public typing_accuracy_score: string;

  @IsString()
  public accent_test_score: string;

  @IsString()
  public attention_to_details_test: string;

  @IsString()
  public multitasking_skills_test: string;

  @IsString()
  public dictation_test: string;

   @IsString()
  public professional_writing_email_test: string;

  @IsString()
  public send_for_testGorilla_skype_interview: string;

  @IsDateString()
  public testGorilla_invitation_date: Date;

  @IsDateString()
  public assessment_completion_date: Date;

  @IsString()
  public stage: string;

  @IsString()
  public average_score: string;

  @IsString()
  public personality_score: string;

  @IsString()
  public attention_to_detail_score: string;

  @IsString()
  public communication_score: string;

  @IsString()
  public disc_profile_score: string;

  @IsString()
  public english_score: string;

  @IsString()
  public filed_out_only_once_from_ip_address: string;

@IsString()
  public webcam_enabled: string;

@IsString()
  public full_screen_mode_always_active: string;

@IsString()
  public mouse_always_in_assessment_window: string;

  @IsString()
  public interviewer_rating: string;

}

export class UpdateTestDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public test_type: string;

  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;

  @IsDateString()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;


  @IsString()
  public interviewer: string;

  @IsString()
  public email_address: string;

  @IsString()
  public typing_speed_score: string;

  @IsString()
  public typing_accuracy_score: string;

  @IsString()
  public accent_test_score: string;

  @IsString()
  public attention_to_details_test: string;

  @IsString()
  public multitasking_skills_test: string;

  @IsString()
  public dictation_test: string;

  @IsString()
  public professional_writing_email_test: string;

  @IsString()
  public send_for_testGorilla_skype_interview: string;

  @IsDateString()
  public testGorilla_invitation_date: Date;

  @IsDateString()
  public assessment_completion_date: Date;

  @IsString()
  public stage: string;

  @IsString()
  public average_score: string;

  @IsString()
  public personality_score: string;

  @IsString()
  public attention_to_detail_score: string;

  @IsString()
  public communication_score: string;

  @IsString()
  public disc_profile_score: string;

  @IsString()
  public english_score: string;

  @IsString()
  public filed_out_only_once_from_ip_address: string;

  @IsString()
  public webcam_enabled: string;

  @IsString()
  public full_screen_mode_always_active: string;

  @IsString()
  public mouse_always_in_assessment_window: string;

  @IsString()
  public interviewer_rating: string;
}
