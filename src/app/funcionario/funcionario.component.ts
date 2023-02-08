import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { SuccessModalComponentComponent } from '../success-modal-component/success-modal-component.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: FuncionarioService, public dialog: MatDialog) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }
// TODO passar o valor de usuario logado e empresa desse usuario.
  submit() {
    console.log({nvarNome: this.form.get('nome')?.value, nvarEmail: this.form.get('nome')?.value, nvarDescricao: this.form.get('descricao')?.value});
    this.service.insertData({nvarNome: this.form.get('nome')?.value, nvarEmail: this.form.get('email')?.value, nvarDescricao: this.form.get('descricao')?.value}).subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    })
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
