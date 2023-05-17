import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { ColumnComponent } from './column/column.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule, HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ExploretreeComponent } from './exploretree/exploretree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { CodeviewerComponent } from './codeviewer/codeviewer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { TablesComponent } from './tables/tables.component';
import { TableComponent } from './table/table.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldSettingsDialogComponent } from './fieldsettingsdialog/fieldsettingsdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddfielddialogComponent } from './addfielddialog/addfielddialog.component';
import { AddtabledialogComponent } from './addtabledialog/addtabledialog.component';
import { TablesettingsdialogComponent } from './tablesettingsdialog/tablesettingsdialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ExploretreeNodeComponent } from './exploretree-node/exploretree-node.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HeroTwoComponent } from './components/pages/home-two/hero-two/hero-two.component';
import { CustomerReviewComponent } from './components/pages/home-two/customer-review/customer-review.component';
import { ImageFeaturesTwoComponent } from './components/pages/home-two/image-features-two/image-features-two.component';
import { ImageFeaturesThreeComponent } from './components/pages/home-two/image-features-three/image-features-three.component';
import { ImageFeaturesFourComponent } from './components/pages/home-two/image-features-four/image-features-four.component';
import { LatestNewsComponent } from './components/pages/home-two/latest-news/latest-news.component';


import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CtaOneComponent } from './components/shared/cta-one/cta-one.component';
import { IntegrationOneComponent } from './components/shared/integration-one/integration-one.component';
import { FaqOneComponent } from './components/shared/faq-one/faq-one.component';
import { WorkProcessComponent } from './components/shared/work-process/work-process.component';
import { WorkProcessTwoComponent } from './components/shared/work-process-two/work-process-two.component';
import { CtaTwoComponent } from './components/shared/cta-two/cta-two.component';
import { PromoTwoComponent } from './components/shared/promo-two/promo-two.component';
import { FeaturesImageFiveComponent } from './components/shared/features-image-five/features-image-five.component';
import { IntegrationTwoComponent } from './components/shared/integration-two/integration-two.component';
import { PromoThreeComponent } from './components/shared/promo-three/promo-three.component';
import { WorkProcessThreeComponent } from './components/shared/work-process-three/work-process-three.component';
import { PriceTabComponent } from './components/shared/price-tab/price-tab.component';
import { FaqTwoComponent } from './components/shared/faq-two/faq-two.component';
import { FaqThreeComponent } from './components/shared/faq-three/faq-three.component';
import { SubscribeCtaComponent } from './components/shared/subscribe-cta/subscribe-cta.component';
import { OthersPageHeaderComponent } from './components/shared/others-page-header/others-page-header.component';
import { CtaThreeComponent } from './components/shared/cta-three/cta-three.component';
import { WorkProcessFourComponent } from './components/shared/work-process-four/work-process-four.component';
import { IntegrationThreeComponent } from './components/shared/integration-three/integration-three.component';
import { BlogColumnComponent } from './components/shared/blog-column/blog-column.component';
import { BrandLogoComponent } from './components/shared/brand-logo/brand-logo.component';
import { PromoFiveComponent } from './components/shared/promo-five/promo-five.component';
import { TestimonialTabsComponent } from './components/shared/testimonial-tabs/testimonial-tabs.component';
import { PriceListComponent } from './components/shared/price-list/price-list.component';
import { CtaFourComponent } from './components/shared/cta-four/cta-four.component';
import { ServicesGridComponent } from './components/shared/services-grid/services-grid.component';
import { FooterWithBgComponent } from './components/shared/footer-with-bg/footer-with-bg.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TestimonialSliderComponent } from './components/shared/testimonial-slider/testimonial-slider.component';
import Swiper from 'swiper';
import { HomeComponent } from './components/pages/home/home.component';
import { HeroFiveComponent } from './components/pages/home/hero-five/hero-five.component';
import { PromoComponent } from './components/pages/home/promo/promo.component';



@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    ExploretreeComponent,
    CodeviewerComponent,
    TablesComponent,
    TableComponent,
    FieldSettingsDialogComponent,
    AddfielddialogComponent,
    AddtabledialogComponent,
    TablesettingsdialogComponent,
    ExploretreeNodeComponent,
    HeaderComponent,
    HeroTwoComponent,
    CustomerReviewComponent,
    ImageFeaturesTwoComponent,
    ImageFeaturesThreeComponent,
    ImageFeaturesFourComponent,
    HomeTwoComponent,
    TestimonialTabsComponent,
    IntegrationOneComponent,
    FooterComponent,
    CtaTwoComponent,
    WorkProcessTwoComponent,
    LatestNewsComponent,
    ServicesGridComponent,
    TestimonialSliderComponent,
    PromoFiveComponent,
    PriceListComponent,
    FeaturesImageFiveComponent,
    HomeComponent,
    HeroFiveComponent,
    PromoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    DragDropModule,
    NgbModule,
    HighlightModule,
    MatTreeModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    ClipboardModule,
    SwiperModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        themePath: 'node_modules/highlight.js/styles/github.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
