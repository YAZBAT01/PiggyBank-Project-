export type TransactionCategory = {
    transactionCategoryID: number
    name: string
    type: TransactionCategoryType
}

export enum TransactionCategoryType {
    INCOME = 'income',
    OUTCOME = 'outcome'
}