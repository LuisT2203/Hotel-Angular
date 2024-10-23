import { Component, OnInit } from '@angular/core';
import { IRegistroPago } from '../../model/iRegistroPago';
import { RegistroPago } from '../../model/registropago';
import { RegistropagoService } from '../../service/registropago.service';
import { IReserva } from '../../model/iReserva';
import { ReservaService } from '../../service/reserva.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';
import { IServicio } from '../../model/iServicio';

@Component({
  selector: 'app-registropago',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './registropago.component.html',
  styleUrl: './registropago.component.css'
})
export class RegistropagoComponent implements OnInit {
  constructor(private service:RegistropagoService, private serviceR:ReservaService,
    private toastr: ToastrService
  ){}

  pagos: IRegistroPago[]=[]
  reservas: IReserva[]=[]
  textoBoton ="Agregar";
  pago = new RegistroPago();
  insUpd = true;
  precio: number = 0;
  precio_habi: number = 0;
  cant_dias:number=0;
  monto: number = 0;


  ngOnInit(): void {
    this.getPagos();
   this.getreservas();
  }
  resetForm(){
    this.pago = new RegistroPago();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getreservas(){
    this.serviceR.getReservas().subscribe(
      (result:any)=>this.reservas=result.object
    );
  }
  getPagos(){
    this.service.getPagos().subscribe(
      (result:any)=>{
        this.pagos=result.object

      },
      error => {
        console.error('Error al obtener los pagos', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(pa: IRegistroPago){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.service.getPago(pa.id_pago).subscribe(
      (data:any)=>{ this.pago = data
        // Buscamos la reserva correspondiente y la asignamos si es válida
        const reservaEncontrada = this.reservas.find(r => r.nro_reserva === pa.reserva.nro_reserva);
        if (reservaEncontrada) {
          this.pago.reserva = reservaEncontrada;
        } else {
          console.error('Reserva no encontrada:', pa.reserva);
        }
      }
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarPago(this.pago).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getPagos();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarPago(this.pago).subscribe(
        (resp: MensajeResponse)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPagos();
          this.insUpd=true;
    },
    (error) => {
      console.error('Error al actualizar:', error);
      this.toastr.error(error.error.mensaje, 'Error');
    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(pa: IRegistroPago) {
  if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      this.service.eliminarPago(pa.id_pago).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getPagos(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}

calcularMonto() {
  const precioServicio = this.pago.precio || 0;
  const precioHabitacion = this.pago.precio_habi || 0;
  const cantidadDias = this.pago.cant_dias || 0;

  // Suma los precios y multiplica por la cantidad de días
  this.pago.monto = (precioServicio + precioHabitacion) * cantidadDias;
}
calcularTotalServicios(servicios: IServicio[]): number {
  return servicios.reduce((total, servicio) => total + servicio.precio, 0);
}

}


