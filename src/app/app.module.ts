import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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




@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    ExploretreeComponent,
    CodeviewerComponent
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
    MatGridListModule
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
