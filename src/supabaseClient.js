import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mqynayequlniqltafzly.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeW5heWVxdWxuaXFsdGFmemx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTI4MjQsImV4cCI6MjA3NDEyODgyNH0.RV5rzh63T2_ONA3MIh7K3XHW_Wj4pt4poesNnYda0aQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


