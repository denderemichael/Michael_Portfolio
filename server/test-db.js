const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('YOUR_')) {
  console.error("❌ Error: Please update server/.env with your real Supabase credentials first!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection to Supabase...");
  const { data, error } = await supabase.from('projects').select('*');

  if (error) {
    console.error("❌ Connection failed:", error.message);
  } else {
    console.log("✅ Success! Fetched", data.length, "projects.");
    console.table(data);
  }
}

testConnection();
