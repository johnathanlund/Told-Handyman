import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent implements OnInit {

public singleModel:string = '1';
 public radioModel:string = 'Middle';
public checkModel:any = {left: false, middle: true, right: false};

  constructor() { }

  ngOnInit() {
  }

}
