import { Component, OnInit } from '@angular/core';
import { MockApiService } from 'src/app/lib/servicio/mock-api.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from 'src/app/lib/servicio/Responses/responses.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuarioId: string;
  perfil: UsuarioDTO;
  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private mockApiService: MockApiService
  ) {}
  volver() {
    this.location.back();
  }
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.usuarioId = params.usuarioId;
      this.mockApiService
        .obtenerUsuarioPorId$(this.usuarioId)
        .subscribe((usuario) => {
          this.perfil = usuario;
        });
    });
  }
}
