import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  onSwitchMode() {
    this.loginMode = !this.loginMode;
    this.error = null;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>
    this.isLoading = true;

    if (this.loginMode) {
      authObs = this.authService.login(email, password)
    }
    else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(response => {
      console.log(response)
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.error = errorMessage
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    })

    form.reset();
  }

  onCloseError() {
    this.error = null;
  }
  showErrorAlert(errorMessage: string) {
    // const alertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentReference = hostViewContainerRef.createComponent(alertComponentFactory);

    componentReference.instance.message = errorMessage;
    this.closeSub = componentReference.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}
