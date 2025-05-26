// paymentUtils.ts
//
// Utility functions for handling payment data within folders.
//
// Exports:
// - Payment, Folder interfaces: Type definitions for payment and folder objects.
// - getRecentUnpaidPayments: Extracts and sorts recent unpaid payments from a list of folders.
//
// Notes:
// - Designed for use in financial or organizational apps where payments are grouped by folders.
// - Extend interfaces as needed for additional payment/folder properties.

// Utility to extract and sort recent unpaid payments from folders

export interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  [key: string]: any;
}

export interface Folder {
  id: string;
  type: string;
  payments: Payment[];
  [key: string]: any;
}

/**
 * Extracts and sorts recent unpaid payments from folders.
 * @param folders Array of folder objects
 * @param max Number of payments to return (default 5)
 */
export function getRecentUnpaidPayments(folders: Folder[], max: number = 5): Payment[] {
  const recentPayments = folders.reduce((acc: Payment[], folder: Folder) => {
    const folderPayments = folder.payments
      .filter((payment: Payment) => !payment.paid)
      .map((payment: Payment) => ({
        ...payment,
        folderId: folder.id,
        folderType: folder.type,
      }));
    return acc.concat(folderPayments);
  }, []);

  return recentPayments
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, max);
} 