import { createClient } from '@supabase/supabase-js';

const URL = 'https://emcqpoxfocwpyvxbsfmm.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtY3Fwb3hmb2N3cHl2eGJzZm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTM5OTgsImV4cCI6MjA3MDA2OTk5OH0.NnnGyDm2-eW_rgXrUTLxq3b0gd6x3hGEVH756YE6Cl0';

export const supabase = createClient(URL, API_KEY);