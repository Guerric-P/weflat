import { Component, OnInit } from '@angular/core';
import { TestService } from 'app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService) { }

valeur: string;

  ngOnInit() {
    this.testService.getTest().subscribe(x => this.valeur = x);
  }

}
