import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  projects = []

  supabaseUrl = 'https://nkoashwniatdkiugiqyr.supabase.co'
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rb2FzaHduaWF0ZGtpdWdpcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzQxNDAsImV4cCI6MjAwMTA1MDE0MH0.1LrdUW_FYMd0uyeuzqjHmhDW6iXYFyw9WvDB7qiSYFk'

  constructor() { }

  async getProjects() {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey)

    let { data, error } = await supabase
      .from('Projects')
      .select('id');

    alert(JSON.stringify(data));

    //return this.projects;
  }
}
