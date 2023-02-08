import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TreeDataSource, FoodNode } from './tree-datasource';
import { EditNameDialogComponent } from './edit-name-dialog/edit-name-dialog.component';
import { MatDialog } from '@angular/material/dialog';





let TREE_DATA: FoodNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussel sprouts" }]
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }]
      }
    ]
  }
];


@Component({
  selector: 'app-tree-organograma',
  templateUrl: './tree-organograma.component.html',
  styleUrls: ['./tree-organograma.component.css']
})
export class TreeOrganogramaComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new TreeDataSource(this.treeControl, TREE_DATA);
  nodes = TREE_DATA;

  constructor(private dialog: MatDialog) {}

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  addGin(parentNode: FoodNode) {
    this.dataSource.add({ name: "New" }, parentNode);
  }

  editName(node: FoodNode) {
    const dialogRef = this.dialog.open(EditNameDialogComponent, {
      width: '300px',
      data: { name: node.name }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nodeIndex = this.nodes.indexOf(node);
        let indexFind = this.getNodeIndex(node.name, this.nodes, [])
        console.log("index achado: "+ indexFind);
        console.log(...this.nodes);
        this.modifyNode(indexFind, result);
        console.log(...this.nodes);
        // this.nodes[nodeIndex].name = result;

      }
    });
  }
  remove(node: FoodNode) {
    this.dataSource.remove(node);
  }


  getNodeIndex(nodeName: string, treeData: FoodNode[], path: number[] = []): number[] {
    for (let i = 0; i < treeData.length; i++) {
      const currentNode = treeData[i];
      if (currentNode.name === nodeName) {
        return [...path, i];
      }
      if (currentNode.children) {
        const result = this.getNodeIndex(nodeName, currentNode.children, [...path, i]);
        if (result.length) {
          return result;
        }
      }
    }
    return [];
  }

  modifyNode(indexArray: number[], newName: string) {
    let nodes = TREE_DATA;
    let node;
    for (let i = 0; i < indexArray.length; i++) {
      node = nodes[indexArray[i]];
      if (i === indexArray.length - 1) {
        node.name = newName;
      } else {
        nodes = node.children!;
      }
    }
  }
}
