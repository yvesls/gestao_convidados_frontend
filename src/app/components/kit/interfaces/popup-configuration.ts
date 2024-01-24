export interface PopupConfiguration {
    title: string;
    message: string;
    type: 'success' | 'warning';
    confirmText?: string;
    cancelText?: string;
    actionCallback?: (result: boolean) => void;
  }