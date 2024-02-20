import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Guest } from "../../kit/model-config/guest.class";
import { GuestService } from "src/app/services/guest.service";

@Component({
  selector: 'app-editar-convidados',
  templateUrl: './editar-convidados.component.html',
  styleUrls: ['./editar-convidados.component.css']
})
export class EditarConvidadosComponent implements OnInit {
  editarForm!: FormGroup;
  guestId: Number = NaN;
  guest: Guest | null = null;

  constructor(private formBuilder: FormBuilder, private guestService: GuestService) { }

  ngOnInit(): void {
    this.guest = this.guestService.getGuest();

    if (this.guest) {
      this.editarForm = this.formBuilder.group({
        nomeConvidado: [this.guest.guestName, Validators.required],
        emailConvidado: [this.guest.guestEmail, Validators.email],
        telefoneConvidado: [this.guest.guestTel],
        tipo: [this.guest.typeGuest],
        presente: [this.guest.present]
      });

      this.guestId = this.guest.guestId;
    }
  }

  onSubmit() {
    if (this.editarForm.valid) {
      console.log(this.editarForm.value);
    }
  }
}
