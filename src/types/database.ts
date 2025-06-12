export interface Profile {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  completed: boolean;
  progress: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

export type Tables = {
  profiles: Profile;
  user_progress: UserProgress;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_progress: {
        Row: UserProgress;
        Insert: Omit<UserProgress, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProgress, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};