import { Component, OnInit } from '@angular/core';
import { MockApiService } from 'src/app/lib/servicio/mock-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/lib/servicio/Responses/responses.model';
import { Location } from '@angular/common';
import { eliminarContacto } from '../../lib/backend/backend';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuarioId: string;
  perfil: UsuarioDTO;
  contactos: Array<UsuarioDTO>;
  usuarios: Array<UsuarioDTO>;
  constructor(
    private location: Location,
    private route: Router,
    private router: ActivatedRoute,
    private mockApiService: MockApiService
  ) {}
  volver() {
    this.location.back();
  }

  eliminarContacto(usuario : UsuarioDTO, contacto: UsuarioDTO){
    this.mockApiService.eliminarContacto$(usuario.id,contacto.id)
    window.alert('¡Amigo eliminado!');
    this.mockApiService.obtenerContactosPorUsuarioId$(this.usuarioId).subscribe((contactos)=>{
      this.contactos = contactos;
    });

  }
  anadirUsuario(usuario : UsuarioDTO, contacto: UsuarioDTO){
    this.mockApiService.anadirContacto$(usuario.id, contacto.id)
    this.route.navigate(['/perfil', this.usuarioId]);
        window.alert('¡Nuevo amigo añadido!, ya tienes más que Juanjo, aunque sea solo uno');
        this.mockApiService.obtenerContactosPorUsuarioId$(this.usuarioId).subscribe((contactos)=>{
          this.contactos = contactos});
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
    this.mockApiService.obtenerContactosPorUsuarioId$(this.usuarioId).subscribe((contactos)=>{
      this.contactos = contactos;
    });
    this.mockApiService.obtenerUsuarios$().subscribe((usuarios)=> {
      this.usuarios = usuarios;
    })
  }
}
