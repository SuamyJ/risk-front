import { Component } from '@angular/core';



@Component({
  selector: 'app-organograma',
  templateUrl: './organograma.component.html',
  styleUrls: ['./organograma.component.css']
})
export class OrganogramaComponent {
  condition : boolean = false;
  isAbrirArvore : boolean = false;
  isAbrirForm : boolean = false;

  abrirArvore() {
    console.log("entrou");
    this.condition = !this.condition;
    this.isAbrirArvore = !this.isAbrirArvore
  }

  abrirForm() {
    console.log("entrou");
    this.condition = !this.condition;
    this.isAbrirForm = !this.isAbrirForm
  }
}

