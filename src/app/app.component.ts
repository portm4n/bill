import { Component, OnInit } from '@angular/core';
import { MockApiService } from './lib/servicio/mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //title = 'bill';
  //
  constructor(private mockApiService: MockApiService) {}
  // ngOnInit(): void {
  //   this.mockApiService.obtenerTodaLaBaseDeDatos$().subscribe((datos) => {
  //     console.log(datos);
  //     this.mockApiService
  //       .sobreescribirBaseDeDatos$({ pepe: 'Hola' })
  //       .subscribe((datos) => {
  //         console.log(datos);
  //       });
  //   });
  // }
  // facturas: Array<FacturaDTO>;
  // constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.mockApiService.iniciarBackendConDatosDeLocalStorage();

    //   this.mockApiService
    //     .obtenerFacturasPorUsuarioId$('77baf3f2-e2d1-42c5-b5fd-57ac681b4554')
    //     .subscribe((facturaUsuarioPutoJuanjo) => {
    //       console.log(facturaUsuarioPutoJuanjo);
    //       this.facturas = facturaUsuarioPutoJuanjo;
    //     });
  }
}
