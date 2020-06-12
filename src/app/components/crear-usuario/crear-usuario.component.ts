import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MockApiService } from '../../lib/servicio/mock-api.service';
import { UsuarioDTO } from '../../lib/servicio/Responses/responses.model';
import { Router } from '@angular/router';
import { crearUsuario } from '../../lib/backend/backend';
import { CrearUsuarioDTO } from 'src/app/lib/servicio/Requests/requests.model';
import { Credencial } from 'src/app/interfaces/credencial';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  usuario: Array<UsuarioDTO>;
  nuevoUsuario: CrearUsuarioDTO;
  credenciales: Credencial;

  constructor(
    private location: Location,
    private mockApiService: MockApiService,
    private router: Router
  ) {}
  volver() {
    this.location.back();
  }

  ngOnInit(): void {
    this.nuevoUsuario = <CrearUsuarioDTO>{};

    this.mockApiService.obtenerUsuarios$().subscribe((datos) => {
      this.usuario = datos;
    });
  }
  crearUsuario() {
    this.mockApiService
      .crearUsuario$(this.nuevoUsuario)
      .subscribe((usuarioCreado) => {
        window.alert('Usuario creado con exito');
        this.router.navigate(['/perfil', usuarioCreado.id]);
        this.credenciales = { id: usuarioCreado.id };
        this.mockApiService
          .login$(this.credenciales)
          .subscribe((token) => localStorage.setItem('token', token));
      });
  }
}
