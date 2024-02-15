import { TypeGuest } from "./type-guest.class";
import { User } from "./user.class";

export class Guest {
    guestId!: Number;
    typeGuest!: TypeGuest;
    user!: User;
    guestName!: String;
    guestEmail!: String;
    guestTel!: String;
    present!: Boolean;
}