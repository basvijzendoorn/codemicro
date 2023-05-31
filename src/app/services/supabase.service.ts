import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSession, createClient, Session, User, UserResponse } from '@supabase/supabase-js'
import { Thumbs } from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  projects = []

  supabaseUrl = 'https://nkoashwniatdkiugiqyr.supabase.co'
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rb2FzaHduaWF0ZGtpdWdpcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzQxNDAsImV4cCI6MjAwMTA1MDE0MH0.1LrdUW_FYMd0uyeuzqjHmhDW6iXYFyw9WvDB7qiSYFk'
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  constructor(private router: Router) {

   }

  async isLoggedIn() {
    const {data, error} = await this.supabase.auth.getSession();
    if (error === null && data.session != null) {
      return true;
    }
    return false;
  }

  async getSession() {
    var { data, error } = await this.supabase.auth.getSession()
    return  {data, error};
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    return {data, error}
  }

  async resendVerificationEmail(email: string) {
    const { data, error } = await this.supabase.auth.resend({
      type: 'signup',
      email: email
    });
    if (error != null) {
      alert(JSON.stringify(error));
    }
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error === null) {
      this.router.navigate(['build']);
    } else {
      alert(error?.message);
    }

    // this.supabase.auth.signUp({
    //   email: email,
    //   password: password
    // }).then((result) => {
    //   alert(JSON.stringify(result));
    //   this.currentUser = result.data.user;
    //   this.currentSession = result.data.session;
    // }).catch((error) => {
    //   alert(error);
    // });
  }

  async getProjects() {

    let { data, error } = await this.supabase
      .from('Projects')
      .select('id');

    alert(JSON.stringify(data));

    //return this.projects;
  }
}
