import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuStateService } from 'src/app/services/menu-state.service';

@Component({
  selector: 'app-cadastro-convidados',
  templateUrl: './cadastro-convidados.component.html',
  styleUrls: ['./cadastro-convidados.component.css']
})
export class CadastroConvidadosComponent implements OnInit {
  cadastroForm!: FormGroup;
  isCollapsed: boolean = false;

  constructor(private formBuilder: FormBuilder, private menuStateService: MenuStateService) { }

  ngOnInit(): void {
    this.menuStateService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });
    
    this.cadastroForm = this.formBuilder.group({
      nomeConvidado: ['', Validators.required],
      emailConvidado: ['', Validators.email],
      telefoneConvidado: [''],
      tipo: [''],
      presente: [false]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
    } else {
    }
  }
}
