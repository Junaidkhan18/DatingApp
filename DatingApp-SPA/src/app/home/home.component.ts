import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  modalRef: BsModalRef;
  message: string;

  constructor(private http: HttpClient, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  registerToggle() {
    this.modalRef.hide();
    this.alertify.success('Confirmed!');
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean){
  this.registerMode = registerMode;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
  
  decline(): void {
    this.modalRef.hide();
    this.alertify.error('Declined!');
  }
}
