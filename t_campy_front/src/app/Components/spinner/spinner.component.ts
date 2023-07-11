import { Component } from '@angular/core';
import { LoaderService } from './../../Services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}

  ngOnInit() {}
}
