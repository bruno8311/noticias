import { Distritos } from './../../Interfaces/distritos';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {
  textoBuscar: string ='';
  texto: string ='';
  articleFilter!: any[];
  name!: string;
  @Input() nombre: string ='';
  @Input() url: any;
  @Input() articles: Distritos[]=[];

  constructor(private modalCtrl: ModalController, private countriesService : CountriesService ) {

   }
ngOnInit(): void {
  this.articleFilter= this.articles;
  this.getGaleria();
  console.log(this.articleFilter)
}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  onSearchChange(ev:any){
    this.textoBuscar = ev.detail.value
    console.log(this.textoBuscar)
    this.texto=this.textoBuscar.toLocaleLowerCase();
    this.filter()
  }

  filter(){
   this.articleFilter = this.articles.filter(item => item.nombre.toLocaleLowerCase().includes(this.texto))
   console.log('Esto se filtro',this.articleFilter)
  }

  getGaleria(){
   if (this.articles[0].idprovincia===179){
      this.countriesService.getGaleria("Huancayo").subscribe({
        next:((data)=>{
          data.map((distritos:any)  => {
            this.articles.map((distritos2)=>{
                if(distritos.fields.descripcio=== distritos2.nombre.toUpperCase()) {
                  distritos2.img = distritos.img
                }
            })
          })
        }),
        error: ((err: any)=>{console.log("error al cargar galeria", err)})
      }
      )

}

  }
}
