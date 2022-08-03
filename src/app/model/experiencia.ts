export class Experiencia {
    id?:number;
    nombreE:string;
    descripcionE:string;
    fechaIngreso:string;
    fechaEgreso:string;

    constructor(nombreE:string, descripcionE:string, fechaIngreso:string, fechaEgreso:string){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
        this.fechaIngreso= fechaIngreso;
        this.fechaEgreso = fechaEgreso;
    }
}
