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
