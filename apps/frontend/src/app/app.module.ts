import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent 
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    HttpClientModule,
    AppRoutingModule,    
    FormsModule
  ],
  providers: [],
  entryComponents:[HomeComponent  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
