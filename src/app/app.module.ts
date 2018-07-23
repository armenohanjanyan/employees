import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeModalComponent
  ],
  entryComponents: [EmployeeModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
