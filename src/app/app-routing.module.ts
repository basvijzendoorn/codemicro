import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ColumnComponent } from './column/column.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { VerifyEmailComponent } from './components/pages/verify-email/verify-email.component';
import { LoginGuard } from './login.guard';
import { ProjectsComponent } from './projects/projects.component';
import { PasswordChangeComponent } from './components/pages/password-change/password-change.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'build',
    component: ColumnComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'password-reset',
    component: PasswordResetComponent
  }, {
    path: 'change-password',
    component: PasswordChangeComponent,
    canActivate: [LoginGuard]
  },
  // {
  //   path: 'verify-email-address',
  //   component: VerifyEmailComponent
  // },
  // {
  //   path: 'home-two',
  //   component: HomeTwoComponent,
  // },
  // {
  //   path: 'home-three',
  //   component: HomeThreeComponent,
  // },
  // {
  //   path: 'home-four',
  //   component: HomeFourComponent,
  // },
  // { path: 'home-five', component: HomeFiveComponent },
  // {
  //   path: 'home-six',
  //   component: HomeSixComponent,
  // },
  // { path: 'home-seven', component: HomeSevenComponent },
  // { path: 'home-eight', component: HomeEightComponent },
  // { path: 'home-nine', component: HomeNineComponent },
  // { path: 'home-ten', component: HomeTenComponent },
  // { path: 'home-eleven', component: HomeElevenComponent },
  // { path: 'home-twelve', component: HomeTwelveComponent },
  // { path: 'home-thirteen', component: HomeThirteenComponent },
  // { path: 'home-fourteen', component: HomeFourteenComponent },
  // { path: 'home-fifteen', component: HomeFifteenComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'services', component: ServicesComponent },
  // { path: 'single-service', component: SingleServiceComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'pricing', component: PricingComponent },
  // { path: 'news', component: NewsComponent },
  // { path: 'news-details', component: NewsDetailsComponent },
  // { path: 'integrations', component: IntegrationsComponent },
  // { path: 'single-integration', component: SingleIntegrationComponent },
  // { path: 'career', component: CareerComponent },
  // { path: 'single-career', component: CareerSingleComponent },
  // { path: 'help-center', component: HelpCenterComponent },
  // { path: 'help-center-details', component: HelpCenterDetailsComponent },
  // { path: 'request-for-demo', component: RequestForDemoComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'password-reset', component: PasswordResetComponent },
  // { path: 'coming-soon', component: ComingSoonComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
