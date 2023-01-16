import { ModalInfoPage } from './../../modals/modal-info/modal-info.page';
import { ModalController } from '@ionic/angular';
import { Provinces } from './../../Interfaces/provinces';
import { Distritos } from './../../Interfaces/distritos';
import { Departments } from './../../Interfaces/departments';
import { CountriesService } from './../../services/countries.service';
import { NewsReponse, Article } from './../../Interfaces/index';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateLoader,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  articles: Article[] = [];
  public valor: boolean=true;

  public isLoadingDepartamento = false;
  public isLoadingProvincia = false;
  public isLoadingDistrito = false;

  public listDepartamento: Departments[] = [];
  public listProvincia: Provinces[] = [];
  public listDistrito: Distritos[] = [];

  public currentDepartamento:any;
  public currentProvincia: any;
  public currentDistrito: any;


  constructor(private countriesService: CountriesService, public modalController: ModalController) {}

  ngOnInit(){
    this.loadDepartamento();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps:{nombre: this.currentProvincia.nombre, articles: this.listDistrito, url: this.currentProvincia.url}
      ,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async cerrarModal(){
    this.modalController.dismiss();
    this.currentDepartamento=null;
  }

  loadDepartamento(){
    this.isLoadingDepartamento = true;
    this.countriesService.getDepartments().subscribe({
      next: ((data:Departments[])=>{
              this.listDepartamento=data;
              this.isLoadingDepartamento = false;
              data.map(()=>{})
            }),
      error: ((err: any)=>{this.isLoadingDepartamento = false})   }
    )
  }

  async loadProvincia(){
    this.isLoadingProvincia = true;
    if(this.currentDepartamento.id===13){
      this.countriesService.getProvincias(this.currentDepartamento.id).subscribe({
        next: ((data: Provinces[]) => {
                data[2].url = "https://imagenes.laestrella.com.pa/files/content_image/uploads/2022/06/28/62bb872375742.jpeg";
                data[1].url = "https://imgs.deperu.com/archivos/dit_trujillo_la_libertad.jpg";
                data[0].url = "https://upload.wikimedia.org/wikipedia/commons/c/cc/Cathedral_of_Lambayeque.jpg";
                this.listProvincia = data;
                this.isLoadingProvincia = false;
              }
              ),
        error: ((err: any)=>{this.isLoadingProvincia = false})
       }
        )
    }
    else if(this.currentDepartamento.id===2){
      this.countriesService.getProvincias(this.currentDepartamento.id).subscribe({
        next: ((data: Provinces[]) => {
                 data[2].url="https://i.ytimg.com/vi/v_JwcNiUEEM/maxresdefault.jpg"
                this.listProvincia = data;
                this.isLoadingProvincia = false;
              }
              ),
        error: ((err: any)=>{this.isLoadingProvincia = false})
       }
        )
    }
    else {
      this.countriesService.getProvincias(this.currentDepartamento.id).subscribe({
        next: ((data: Provinces[]) => {
                this.listProvincia = data;
                this.isLoadingProvincia = false;
              }
              ),
        error: ((err: any)=>{this.isLoadingProvincia = false})
       }
        )
    }
  }

  async loadDistrito(){
    this.isLoadingDistrito = true;
    this.countriesService.getDistritos(this.currentProvincia.id).subscribe({
      next: ((data: Distritos[]) => {
        this.listDistrito = data;
        this.isLoadingDistrito = false;
        }),
      error: ((err: any)=>{this.isLoadingDistrito = false})
    })
  }

  async handleChangeDepartament(ev: any){
    this.currentProvincia=null;
    this.currentDistrito=null;
    this.currentDepartamento = ev.target.value;
  await  this.loadProvincia();
  }
   async handleChangeProvince(ev: any){
    this.valor=false;
    this.currentDistrito=null;
    this.currentProvincia = ev.target.value;
    this.loadDistrito();

  }
  handleChangeDistrict(ev :any){
  }
}
