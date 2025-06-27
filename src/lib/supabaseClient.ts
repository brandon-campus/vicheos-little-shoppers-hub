import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krehsnkotamhweuujtbx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZWhzbmtvdGFtaHdldXVqdGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzk5MTQsImV4cCI6MjA2NjYxNTkxNH0.ymch8zG30C27UJfzvDkUjqnocf4VEoo_MMGCAnJmI-w';

export const supabase = createClient(supabaseUrl, supabaseKey); 