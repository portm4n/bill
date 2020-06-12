import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss'],
})
export class CargandoComponent implements OnInit {
  @Input() fill: string = '#ffffff';
  @Input() width: string = '4rem';

  constructor() {}

  ngOnInit(): void {}
}
