export interface IClientAccount{
  _id?: string;
  user_name: string;
  email: string;
  password?: string;
  activated?: boolean;
  spammy?: boolean;
  client_id: string
  }