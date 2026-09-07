const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xpkndlxtpphaqaluxaaf.supabase.co';
const supabaseKey = 'sb_secret_Z7OElpZTZ4yG6rU7BfK5yw_Rls1JEHZ';

console.log("Connecting to Supabase with secret key...");
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('test_logs')
    .insert([{ content: 'Antigravity direct connection test successful!' }])
    .select();

  if (error) {
    console.error("Supabase Error:", error.message);
  } else {
    console.log("Success! Inserted row:", data);
  }
}

test();
