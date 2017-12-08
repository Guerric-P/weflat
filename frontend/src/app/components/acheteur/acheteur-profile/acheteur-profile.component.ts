import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';

@Component({
  selector: 'app-acheteur-profile',
  templateUrl: './acheteur-profile.component.html',
  styleUrls: ['./acheteur-profile.component.css']
})
export class AcheteurProfileComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService) { }

  profile: any;

  ngOnInit() {
    this.profile = this.sessionStorageService.place;
  }

}
