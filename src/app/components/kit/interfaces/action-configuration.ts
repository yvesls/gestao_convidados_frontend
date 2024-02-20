import { Guest } from "../model-config/guest.class";

export interface ActionConfiguration {
    openModalOnClick: boolean;
    editAction: (model: any) => void;
    deleteAction: (id: number) => void;
}
  