import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/lib/servicio/Responses/responses.model';
import { MockApiService } from 'src/app/lib/servicio/mock-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarios: Array<UsuarioDTO>;
  usuarioSeleccionadoId: string;
  constructor(private mockApiService: MockApiService) {}
  ngOnInit(): void {
    this.usuarioSeleccionadoId = '';
    this.mockApiService.obtenerUsuarios$().subscribe((listadoUsuarios) => {
      console.log(listadoUsuarios);
      this.usuarios = listadoUsuarios;
    });
  }
}