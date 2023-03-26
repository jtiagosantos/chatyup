import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://byyeynvethffxbhhrfjw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eWV5bnZldGhmZnhiaGhyZmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5MzEzNDcsImV4cCI6MTk5NDUwNzM0N30.CAhNIcUT4dXrIj0y-RsI7K9nY5T8C0FED6kJwSmF8P0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
