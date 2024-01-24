import { PopupConfiguration } from "../interfaces/popup-configuration";

export class SuccessPopupConfig implements PopupConfiguration {
    title: string = "Sucesso";
    message: string = "A operação foi concluída com sucesso.";
    type: "warning" | "success" = "success";
    cancelText?: string | undefined = "Ok";
}