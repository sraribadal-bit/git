import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xpkndlxtpphaqaluxaaf.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_Z7OElpZTZ4yG6rU7BfK5yw_Rls1JEHZ';

export const supabase = createClient(supabaseUrl, supabaseKey);