import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStore } from './login.store';
import { User } from '../kit/model-config/user.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private loginStore: LoginStore, private authService: AuthService) {
  }

  ngOnInit(): void {
  }
  
  fazerLogin() {
    this.loginStore.logar(this.user).subscribe({
      next: (response: any) => {
        console.log(response)
        const authToken = response.token;
        this.authService.setAuthToken(authToken);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      }
    });
  }

}
