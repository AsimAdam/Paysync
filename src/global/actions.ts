
import { Folder, Payment, UpdatePaymentStatusAction } from './reducers/folderReducer';

export const addFolder = (folder: Folder) => ({
    type: 'ADD_FOLDER',
    payload: folder,
});

export const addPayment = (payment: Payment, folderId: string) => ({
    type: 'ADD_PAYMENT',
    payload: { payment, folderId },
});


export const updatePaymentStatus = (folderId: string, updatedPayment: Payment): UpdatePaymentStatusAction => ({
    type: 'UPDATE_PAYMENT_STATUS',
    payload: { folderId, updatedPayment },
});

