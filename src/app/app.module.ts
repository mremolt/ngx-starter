import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

const DEBUG: boolean = !!process.env.DEBUG;

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: DEBUG,
      preloadingStrategy: PreloadAllModules,
    }),
    BrowserModule,
    CommonModule,
  ],
})
export class AppModule {}
