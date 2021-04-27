import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ApiClienteService } from '../services/api-cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  lstCliente: any;
  dtOptions: DataTables.Settings = {};
  cliente: Cliente = {}as Cliente;
  crearCliente:boolean = false;
  btnEditar:boolean = false;
  submitte:boolean = false;

  constructor(private formBuilder:FormBuilder, private apiCliente: ApiClienteService) { }
  formulario = this.formBuilder.group({
    direccion: ['',Validators.required],
    telefono: ['',Validators.required],
    nombre: ['',Validators.required],
    email: ['',Validators.required],
    nroDeIdentificacion: ['',Validators.required],
    fechaNacimiento: ['',Validators.required],
    fechaInscripcion: ['',Validators.required],
    temaInteres: ['',Validators.required],
    estado: ['',Validators.required]
  })

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetCliente();
  }

  get f(){
    return this.formulario.controls//este metodo  es para poner un alias al forulario
  }
  
  resetFormulario(){ // metodo para limpiar un formulario
    this.formulario.reset();
  }

  mostrarClientes(){
    this.btnEditar=false;
    this.crearCliente=true;
    this.resetFormulario();
    
  }

  GetCliente(){
    this.apiCliente.GetCliente().subscribe(response => {
      this.lstCliente = response.datos;
    })
  }

  AddCliente() {
    console.log(this.formulario.value)
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    console.log(this.cliente);
    this.apiCliente.addCliente(this.cliente).subscribe(response => {
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
    })
  }
  editCliente(oCliente: Cliente){
    this.formulario.controls.Direccion.setValue(oCliente.direccion)
    this.formulario.controls.Telefono.setValue(oCliente.telefono)
    this.formulario.controls.Nombre.setValue(oCliente.nombre)
    this.formulario.controls.Email.setValue(oCliente.email)
    this.formulario.controls.NroDeIdentificacion.setValue(oCliente.nroDeIdentificacion)
    this.formulario.controls.FechaNacimiento.setValue(oCliente.fechaNacimiento)
    this.formulario.controls.FechaInscripcion.setValue(oCliente.fechaInscripcion)
    this.formulario.controls.TemaInteres.setValue(oCliente.temaInteres)
    this.formulario.controls.Etado.setValue(oCliente.estado)
    this.crearCliente = true;
    this.cliente.id = oCliente.id;
    this.btnEditar=true;
  }
  updateCliente(){
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    this.apiCliente.updateCliente(this.cliente).subscribe(response=>{
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCliente();
     })
  }

  inavilitarCliente(cliente:Cliente){
    this.apiCliente.inavilitarCliente(cliente.id).subscribe(response =>{
     
        if(response.exito == 0){
          console.log(response.mensaje);
          return;
        }
        alert(response.exito)
        this.GetCliente();

    })

  }
}
