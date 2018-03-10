import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseBackendLayoutComponent } from '../base-backend-layout/base-backend-layout.component';

@Component({
  selector: 'app-acheteur-layout',
  templateUrl: './acheteur-layout.component.html',
  styleUrls: ['./acheteur-layout.component.scss']
})
export class AcheteurLayoutComponent extends BaseBackendLayoutComponent implements OnInit {

}
