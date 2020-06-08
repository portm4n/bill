import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockApiService } from 'src/app/lib/servicio/mock-api.service';
import {
  FacturaDTO,
  UsuarioDTO,
  TipoDeFacturaDTO,
} from 'src/app/lib/servicio/Responses/responses.model';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
})
export class FacturasComponent implements OnInit {
  usuario: UsuarioDTO;
  tiposDeFactura: Array<TipoDeFacturaDTO>;
  usuarioId: string;
  facturas: Array<FacturaDTO>;
  estaPagada: string;

  constructor(
    private router: ActivatedRoute,
    private mockApiService: MockApiService,
    private location: Location
  ) {}

  volver() {
    this.location.back();
  }
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.usuarioId = params['usuarioId'];
      this.mockApiService
        .obtenerFacturasPorUsuarioId$(params['usuarioId'])
        .subscribe((facturas) => {
          this.facturas = facturas;
        });
      this.mockApiService
        .obtenerUsuarioPorId$(params['usuarioId'])
        .subscribe((usuario) => {
          this.usuario = usuario;
        });
    });
    this.mockApiService.obtenerTiposDeFacturas$().subscribe((tipo) => {
      this.tiposDeFactura = tipo;
    });
  }
  obtenerTipoFactura(tipoFacturaId: string, campo: string) {
    return this.tiposDeFactura?.find((tipo) => tipo.id == tipoFacturaId)[campo];
  }

  pagada(estaPagada: boolean) {
    return estaPagada ? 'Si' : 'No';
  }
  // pagada(pagada: boolean) {
  //   if (pagada == true) {
  //     return (this.estaPagada = 'Si');
  //   } else {
  //     return (this.estaPagada = 'No');
  //   }
  // }
}
