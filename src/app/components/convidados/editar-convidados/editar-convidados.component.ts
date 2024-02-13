import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-editar-convidados',
  templateUrl: './editar-convidados.component.html',
  styleUrls: ['./editar-convidados.component.css']
})
export class EditarConvidadosComponent implements OnInit {
  editarForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      nomeConvidado: ['', Validators.required],
      emailConvidado: ['', Validators.email],
      telefoneConvidado: [''],
      tipo: [''],
      presente: [false]
    });
  }

  onSubmit() {
    if (this.editarForm.valid) {
      console.log(this.editarForm.value);
    }
  }
}
