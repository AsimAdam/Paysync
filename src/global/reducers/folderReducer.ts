// folderReducer.ts
//
// Redux reducer for managing folders and their associated payments in the application state.
//
// State:
// - FolderState: Contains an array of Folder objects, each with payments.
//
// Actions handled:
// - ADD_FOLDER: Adds a new folder to the state.
// - ADD_PAYMENT: Adds a payment to a specific folder.
// - UPDATE_PAYMENT_STATUS: Updates the status of a payment in a folder.
//
// Notes:
// - Designed for use in financial or organizational apps with folder/payment structure.
// - Extend action types and state as needed for additional features.

export interface Payment {
    id: string;
    title: string;
    amount: string;
    dueDate: string;
    description: string;
    paid: boolean;
    type: 'Payable' | 'Receivable';
}

export interface Folder {
    id: string;
    name: string;
    type: 'payable' | 'receivable';
    payments: Payment[];
}

export interface UpdatePaymentStatusAction {
    type: 'UPDATE_PAYMENT_STATUS';
    payload: {
        folderId: string;
        updatedPayment: Payment;
    };
}

export interface FolderState {
    folders: Folder[];
}


const initialState: FolderState = {
    folders: [],
};

const folderReducer = (state: FolderState = initialState, action: any): FolderState => {
    switch (action.type) {
        case 'ADD_FOLDER':
            return {
                ...state,
                folders: [...state.folders, action.payload],
            };
        case 'ADD_PAYMENT':
            return {
                ...state,
                folders: state.folders.map(folder =>
                    folder.id === action.payload.folderId
                        ? { ...folder, payments: [...folder.payments, action.payload.payment] }
                        : folder
                ),
            };
        case 'UPDATE_PAYMENT_STATUS':
            return {
                ...state,
                folders: state.folders.map(folder =>
                    folder.id === action.payload.folderId
                        ? {
                              ...folder,
                              payments: folder.payments.map(payment =>
                                  payment.id === action.payload.updatedPayment.id
                                      ? action.payload.updatedPayment
                                      : payment
                              ),
                          }
                        : folder
                ),
            };
        default:
            return state;
    }
};


export default folderReducer;
