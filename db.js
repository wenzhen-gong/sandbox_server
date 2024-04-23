const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()

const URL = process.env.URL;
const KEY = process.env.KEY;
const supabase = createClient(URL, KEY);

module.exports = supabase;