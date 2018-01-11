import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { AuthenticationService } from 'app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { BaseLayoutComponent } from 'app/layout/base-layout/base-layout.component';

@Component({
  selector: 'app-acheteur-layout',
  templateUrl: './acheteur-layout.component.html',
  styleUrls: ['./acheteur-layout.component.css']
})
export class AcheteurLayoutComponent extends BaseLayoutComponent implements OnInit {
}
