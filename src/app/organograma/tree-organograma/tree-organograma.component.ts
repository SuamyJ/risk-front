import { Component, Input } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatFormFieldControl } from '@angular/material/form-field';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

const TREE_DATA: TreeNode[] = [
  {
    id: 1,
    name: 'Root',
    children: [
      {
        id: 2,
        name: 'Child 1'
      },
      {
        id: 3,
        name: 'Child 2'
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
  @Input()
  selectedNodeId!: number;  
  flatNodeMap = new Map<ExampleFlatNode, TreeNode>();

    private _transformer = (node: TreeNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
        id: node.id
      };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    data: any;

    constructor() {
      this.dataSource.data = TREE_DATA;
    }
    updateNodeName(id: number, newName: string) {
      const node = this.findNode(id, TREE_DATA);
      if (node) {
        node.name = newName;
        this.dataSource.data = TREE_DATA;
      }
    }

    private findNode(id: number, nodes: TreeNode[]): TreeNode | null {
      for (const node of nodes) {
        if (node.id === id) {
          return node;
        } else if (node.children) {
          const found = this.findNode(id, node.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }

    getParentNodeId(nodeId: number): number | null {
      let parentNodeId = null;
      for (const node of TREE_DATA) {
        if (node.children) {
          for (const child of node.children) {
            if (child.id === nodeId) {
              parentNodeId = node.id;
              break;
            }
          }
        }
      }
      return parentNodeId;
    }
      
    isSelected(nodeId: number) {
      return nodeId === this.selectedNodeId;
    }

    expand(node: ExampleFlatNode) {
      this.treeControl.expand(node);
    }
    
    collapse(node: ExampleFlatNode) {
      this.treeControl.collapse(node);
    }
}
