import { Component, OnInit } from '@angular/core';
import { ZipCodeService } from '../../../shared/services/zip-code.service';
import { ZipCodeClass } from '../../../core/models/ZipCodeClass';

@Component({
  selector: 'app-zip-codes',
  templateUrl: './zip-codes.component.html',
  styleUrls: ['./zip-codes.component.scss']
})
export class ZipCodesComponent implements OnInit {

  results: ZipCodeClass[];

  constructor(private zipCodeService: ZipCodeService) { }

  ngOnInit() {
  }

  onKeyUp(event: any) {
    this.zipCodeService.searchZipCodes(event.target.value).subscribe(res => {
      this.results = res;
    });
  }

}
