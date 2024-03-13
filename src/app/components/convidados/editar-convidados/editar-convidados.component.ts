import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Guest } from "../../kit/model-config/guest.class";
import { GuestService } from "src/app/services/guest.service";
import { TipoConvidadosStore } from "../tipo-convidados/tipo-convidados.store";
import { TypeGuest } from "../../kit/model-config/type-guest.class";

@Component({
  selector: 'app-editar-convidados',
  templateUrl: './editar-convidados.component.html',
  styleUrls: ['./editar-convidados.component.css']
})
export class EditarConvidadosComponent implements OnInit {
  editarForm!: FormGroup;
  guestId: Number = NaN;
  guest: Guest | null = null;
  typeGuests!: TypeGuest[];

  constructor(private formBuilder: FormBuilder, private guestService: GuestService, private typeGuestStore: TipoConvidadosStore) { }

  ngOnInit(): void {
    this.setSelects();

    this.guest = this.guestService.getGuest();

    if (this.guest) {
      this.editarForm = this.formBuilder.group({
        nomeConvidado: [this.guest.guestName, Validators.required],
        emailConvidado: [this.guest.guestEmail, Validators.email],
        telefoneConvidado: [this.guest.guestTel],
        tipo: [this.guest.typeGuest.typeId],
        presente: [this.guest.present]
      });
      this.guestId = this.guest.guestId;
    }
  }

  setSelects() {
    this.typeGuestStore.findAllByUser().subscribe((typeGuests) => {
      
    });
  }

  onSubmit() {
    if (this.editarForm.valid) {
      console.log(this.editarForm.value);
    }
  }
}
