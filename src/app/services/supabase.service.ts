import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSession, createClient, Session, User, UserResponse } from '@supabase/supabase-js'
import { homeUrl } from 'src/environments/environment';
import { Thumbs } from 'swiper';

export interface Project {
  name: string,
  id: number,
  user_id: string,
  tables: any
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  projects: Project[] = []

  currentSession: Session | null = null;

  supabaseUrl = 'https://nkoashwniatdkiugiqyr.supabase.co'
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rb2FzaHduaWF0ZGtpdWdpcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzQxNDAsImV4cCI6MjAwMTA1MDE0MH0.1LrdUW_FYMd0uyeuzqjHmhDW6iXYFyw9WvDB7qiSYFk'
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  constructor(private router: Router) {
    this.supabase.auth.getSession().then((value) => {
      if (value.error === null) {
        this.currentSession = value.data.session;
      }
    });
  }

  isLoggedIn() {
    if (this.currentSession != null) {
      return true;
    }
    return false;
  }

  async changePassword(password: string) {
    const { data, error } = await this.supabase.auth.updateUser({password: password});
    return {data, error};
  }

  async forgotPassword(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: homeUrl + '/change-password',
    });

    return { data, error };
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

  async signInWithAzure() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
      },
    });  
  }

  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }  

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error === null) {
      this.currentSession = data.session;
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

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    this.currentSession = null;
    this.router.navigate(['']);
  }

  getProjects() {
    return this.projects;
  }

  async updateProjects() {
    let { data, error } = await this.supabase
      .from('Projects')
      .select('name, id, tables, user_id')
      .order('name')
    if (error === null) {
      this.projects = data ?? [];
    }
    //return this.projects;
  }

  async newProject(name: string) {
    const { data, error } = await this.supabase
      .from('Projects')
      .insert([
        { name: name, user_id: this.currentSession?.user.id, tables: [] },
      ])
      .select();
    await this.updateProjects();
    return {data, error};
  }
}
