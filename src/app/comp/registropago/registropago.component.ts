import { Component, OnInit } from '@angular/core';
import { IRegistroPago } from '../../model/iRegistroPago';
import { RegistroPago } from '../../model/registropago';
import { RegistropagoService } from '../../service/registropago.service';
import { IReserva } from '../../model/iReserva';
import { ReservaService } from '../../service/reserva.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registropago',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './registropago.component.html',
  styleUrl: './registropago.component.css'
})
export class RegistropagoComponent implements OnInit {
  constructor(private service:RegistropagoService, private serviceR:ReservaService){}

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
      (result:any)=>this.pagos=result.object
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
          (resp)=>{
            this.getPagos();
            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarPago(this.pago).subscribe(
        (resp)=>{
          this.getPagos();
          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(pa: IRegistroPago) {
  if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      this.service.eliminarPago(pa.id_pago).subscribe(
          () => {
              this.getPagos(); // Actualizar la lista después de eliminar
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

}
