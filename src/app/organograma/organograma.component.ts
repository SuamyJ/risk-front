import { Component } from '@angular/core';
import { OrganogramaService } from './organograma.service';
import { Organograma } from './tree-organograma/tree-datasource';



@Component({
  selector: 'app-organograma',
  templateUrl: './organograma.component.html',
  styleUrls: ['./organograma.component.css']
})
export class OrganogramaComponent {
  TREE_DATA : Organograma[] = []
  
  condition : boolean = false;
  isAbrirArvore : boolean = false;
  isAbrirForm : boolean = false;

  constructor(private service: OrganogramaService){

  }

  ngOnInit(){
    this.service.fetchDataArray().subscribe((res) => { this.TREE_DATA = res as Organograma[];
      console.log("organogramaComponent: " + JSON.stringify(this.TREE_DATA));
      this.service.setTreeData(res as Organograma[]);
    });
  }

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

