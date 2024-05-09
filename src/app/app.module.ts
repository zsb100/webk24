import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TermekekModule } from './pages/termekek/termekek.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RegisterModule } from './pages/register/register.module';
import { LoginModule } from './pages/login/login.module';
import { RendelesModule } from './pages/rendeles/rendeles.module';
import { ProfileModule } from './pages/profile/profile.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { KosarModule } from './pages/kosar/kosar.module';
import { HomeAboutModule } from './pages/home-about/home-about.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { ContactModule } from './pages/contact/contact.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TermekekModule,
    MatIconModule,
    RegisterModule,
    LoginModule,
    RendelesModule,
    ProfileModule,
    NotFoundModule,
    KosarModule,
    HomeAboutModule,
    HomePageModule,
    ContactModule,
    AngularFireModule.initializeApp({"projectId":"ek-szer","appId":"1:316942827154:web:06f975e9b102244691b04b","storageBucket":"ek-szer.appspot.com","apiKey":"AIzaSyBEsMeG5ApKd32XZlfejr1MWhyL61Fiv1w","authDomain":"ek-szer.firebaseapp.com","messagingSenderId":"316942827154"}),
    AngularFireAuthModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp({
      projectId: 'ek-szer',
      appId: '1:316942827154:web:06f975e9b102244691b04b',
      storageBucket: 'ek-szer.appspot.com',
      apiKey: 'AIzaSyBEsMeG5ApKd32XZlfejr1MWhyL61Fiv1w',
      authDomain: 'ek-szer.firebaseapp.com',
      messagingSenderId: '316942827154'
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
