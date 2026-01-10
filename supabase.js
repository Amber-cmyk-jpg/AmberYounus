import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://tgdnjairzprucdvdhind.supabase.co'
const supabaseKey = 'sb_publishable_jDzwuG1xp2C6BvR7bBi6vQ_1-WUir-r'
export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase