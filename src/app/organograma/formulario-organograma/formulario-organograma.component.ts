import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { SuccessModalComponentComponent } from 'src/app/success-modal-component/success-modal-component.component';
import { OrganogramaService } from '../organograma.service';



@Component({
  selector: 'app-formulario-organograma',
  templateUrl: './formulario-organograma.component.html',
  styleUrls: ['./formulario-organograma.component.css']
})
export class FormularioOrganogramaComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              public dialog: MatDialog, 
              private organogramaService: OrganogramaService,
              private funcionarioService: FuncionarioService) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }

// TODO passar o valor de usuario logado que inseriu essa empresa.  
  
recuperarValores() {
  this.organogramaService.fetchData().subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    });
    this.funcionarioService.fetchData().subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    });
}

submit() {
    // console.log({id: null,idnVarEmpresa: 'teste', nVarNome: this.form.get('nome')?.value, nVarDescricao: this.form.get('descricao')?.value});
    // this.service.insertData({id: null, idnVarEmpresa: 'teste', nvarNome: this.form.get('nome')?.value, nvarDescricao: this.form.get('descricao')?.value}).subscribe({
    //   next: (n) => console.log(n),
    //   error: (e) => console.error(e)
    // });

    this.openSuccessModal();
  }
  openSuccessModal() {
    const dialogRef = this.dialog.open(SuccessModalComponentComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
