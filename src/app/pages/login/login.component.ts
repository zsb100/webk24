import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  login() {
    if (this.loginForm.value.name && this.loginForm.value.password) {
      this.auth.login(this.loginForm.value.name, this.loginForm.value.password).then(
        user => {
          if (user.user) {
            localStorage.setItem('user', user.user.uid);
            alert('Sikeres bejelentkezés!');
            this.router.navigate(['/']);
          }
        }
      ).catch(error => {
        console.log(error);
        alert('Hibás felhasználónév vagy jelszó!');
      });

    } else {
      alert('A mezők kitöltése kötelező!');
      return;
    }
  }
}
