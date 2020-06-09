import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MockApiService } from '../../lib/servicio/mock-api.service';
import { UsuarioDTO } from '../../lib/servicio/Responses/responses.model';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  usuario: Array<UsuarioDTO>;
  constructor(private location: Location, private mockApiService: MockApiService) {}
  volver() {
    this.location.back();
  }

  ngOnInit(): void {
    this.mockApiService.obtenerUsuarios$().subscribe((datos) => {this.usuario = datos; } );
  }
}
