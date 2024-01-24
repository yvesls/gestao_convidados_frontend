import { PopupConfiguration } from "../interfaces/popup-configuration";

export class DeletePopupConfig implements PopupConfiguration {
    title: string = "Confirmação de Exclusão";
    message: string = "Tem certeza que deseja excluir este item?";
    type: "warning" | "success" = "warning";
    confirmText?: string | undefined = "Excluir";
    cancelText?: string | undefined = "Cancelar";
    actionCallback?: (result: boolean) => void;
}