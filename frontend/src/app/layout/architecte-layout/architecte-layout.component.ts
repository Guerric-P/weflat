import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { BaseLayoutComponent } from 'app/layout/base-layout/base-layout.component';

@Component({
  selector: 'app-architecte-layout',
  templateUrl: './architecte-layout.component.html',
  styleUrls: ['./architecte-layout.component.css']
})
export class ArchitecteLayoutComponent extends BaseLayoutComponent implements OnInit {

}
