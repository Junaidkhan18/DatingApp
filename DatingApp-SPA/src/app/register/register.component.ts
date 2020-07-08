import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { type } from 'os';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  modalRef: BsModalRef;
  ConfirmationModalRef: BsModalRef;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['null', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmpassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }

  register(){
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successfully');
        this.modalRef.hide();
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    openConfirmationModal(template: TemplateRef<any>) {
      this.ConfirmationModalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.ConfirmationModalRef.hide();
      this.modalRef.hide();
      this.alertify.success('Confirmed!');
    }

    decline(): void {
      this.ConfirmationModalRef.hide();
      this.alertify.error('Declined!');
    }
}
