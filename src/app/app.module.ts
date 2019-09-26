import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ProductService, SHARED_SERVICES} from './shared/services';
import {HomeModule} from './home/home.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchFormModule} from './shared/components/search-form';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {API_BASE_URL, WS_URL} from './app.tokens';
import {environment} from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    HttpClientModule,
    HomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    SearchFormModule,
    BrowserAnimationsModule
  ],
  providers: [
    ...SHARED_SERVICES,
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    {provide: WS_URL, useValue: environment.wsUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
