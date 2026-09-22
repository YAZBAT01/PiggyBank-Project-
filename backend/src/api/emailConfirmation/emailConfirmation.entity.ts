export type EmailConfirmation = {
    userId: string;
    confirmationToken: string;
    isConfirmed: boolean;
}