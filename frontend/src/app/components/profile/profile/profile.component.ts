import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../../common/Constantes'
import { LocalStorageService } from 'app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  role: string;
  ROLE_ARCHITECTE = Constantes.ROLE_ARCHITECTE;
  ROLE_ACHETEUR = Constantes.ROLE_ACHETEUR;

  ngOnInit() {
    this.role = this.localStorageService.tokenPayload.roles[0].authority;
  }

}
