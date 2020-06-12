import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../lib/servicio/Responses/responses.model';
import { BehaviorSubject } from 'rxjs';
import { MockApiService } from '../lib/servicio/mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios = new BehaviorSubject<Array<UsuarioDTO>>([]);

  constructor(private mockApiService: MockApiService) {}

  obtenerUsuarios() {
    return this.usuarios.asObservable();
  }

  actualizar(nuevosUsuarios) {
    this.usuarios.next(nuevosUsuarios);
  }

  obtenerUsuariosDeBackEndMenosUsuarioConectado() {
    this.mockApiService.obtenerUsuarios$().subscribe((usuarios) => {
      this.actualizar(usuarios);
    });
  }
}
