export class Habilidad {
    id?:number;
    public nombreHabilidad:string;
    public progresoHabilidad:number;
    public typeHabilidad:string;

    constructor( nombreHabilidad:string, progresoHabilidad:number, typeHabilidad:string){
        this.nombreHabilidad = nombreHabilidad;
        this.progresoHabilidad = progresoHabilidad;
        this.typeHabilidad = typeHabilidad;
    }
}
