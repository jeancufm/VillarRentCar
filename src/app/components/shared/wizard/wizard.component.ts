import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/index';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls:['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  constructor(private _config:ConfigService) {
    this._config.ruta = 'home';
  }

  ngOnInit() {
  }

}
