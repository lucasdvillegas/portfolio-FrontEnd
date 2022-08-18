export class persona {
    id?:number;
    nombre:string;
    apellido:string;
    img:string;

    imgBack:string;
    titulo:string;
    ubicacion:string;
    gitLink:string;
    linLink:string;

    //Falta backgroundImg y redes sociales

    constructor (nombre:string, apellido:string, img:string, imgBack:string, titulo:string, ubicacion:string, gitLink:string, linLink:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.imgBack = imgBack;
        this.titulo = titulo;
        this.ubicacion = ubicacion;
        this.gitLink = gitLink;
        this.linLink = linLink;
    }
}