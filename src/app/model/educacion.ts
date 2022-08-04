export class Educacion {
    id?:number;
    nombreEducacion:string;
    descripcionEducacion:string;
    fechaIngreso:string;
    fechaEgreso:string;

    constructor(nombreEducacion:string, descripcionEducacion:string, fechaIngreso:string, fechaEgreso:string){
        this.nombreEducacion = nombreEducacion;
        this.descripcionEducacion = descripcionEducacion;
        this.fechaIngreso= fechaIngreso;
        this.fechaEgreso = fechaEgreso;
    }
}
