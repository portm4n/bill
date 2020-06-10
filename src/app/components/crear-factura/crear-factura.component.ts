import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MockApiService } from 'src/app/lib/servicio/mock-api.service';
import {
  TipoDeFacturaDTO,
  UsuarioDTO,
} from 'src/app/lib/servicio/Responses/responses.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CrearFacturaDTO,
  PagadorDTO,
} from 'src/app/lib/servicio/Requests/requests.model';
import { TipoDeReparticionModelo } from 'src/app/lib/backend/modelos.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss'],
})
export class CrearFacturaComponent implements OnInit {
  tiposDeFactura: Array<TipoDeFacturaDTO>;
  usuarioId: string;
  sugeridos: Array<UsuarioDTO>;
  nuevaFactura: CrearFacturaDTO;
  TipoDeReparticion = TipoDeReparticionModelo;
  pagadores: Array<PagadorDTO>;

  constructor(
    private location: Location,
    private mockApiService: MockApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  volver() {
    this.location.back();
  }
  ngOnInit(): void {
    this.pagadores = [];
    this.nuevaFactura = <CrearFacturaDTO>{};
    this.route.params.subscribe((params) => {
      this.usuarioId = params['usuarioId'];
    });
    this.mockApiService.obtenerTiposDeFacturas$().subscribe((tipo) => {
      this.tiposDeFactura = tipo;
    });
    this.mockApiService
      .obtenerSugeridosPorUsuarioId$(this.usuarioId)
      .subscribe((sugeridos) => {
        this.sugeridos = sugeridos;
      });
  }
  crearFactura() {
    this.nuevaFactura.pagadores = this.pagadores;
    this.mockApiService
      .crearFactura$(this.nuevaFactura)
      .subscribe((facturaCreada) => {
        this.router.navigate(['/perfil', this.usuarioId]);
        window.alert('Creada con exito');
      });
  }
  anadirPagador(usuario: UsuarioDTO) {
    if (this.estaPagadorAnadido(usuario.id)) {
      this.eliminarPagadorYaAnadido(usuario.id);
    } else {
      this.anadirPagadorALaLista(usuario.id);
    }
    this.calcularTotalDeLosPagadores();
  }
  calcularTotalDeLosPagadores() {
    this.pagadores.forEach(
      (pagador) => (pagador.total = this.calcularTotalPorPagador())
    );
  }
  calcularTotalPorPagador() {
    return this.nuevaFactura.total / (this.pagadores.length + 1);
  }
  estaPagadorAnadido(usuarioId: string) {
    return this.pagadores.find((pagador) => pagador.usuarioId == usuarioId);
  }
  eliminarPagadorYaAnadido(usuarioId: string) {
    this.pagadores = this.pagadores.filter(
      (pagador) => pagador.usuarioId != usuarioId
    );
  }
  anadirPagadorALaLista(usuarioId: string) {
    let pagador: PagadorDTO = {
      usuarioId: usuarioId,
      total: this.calcularTotalPorPagador(),
    };
    this.pagadores.push(pagador);
  }
}
