export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const ErrorCodes = {
    STORAGE_ERROR: 'STORAGE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

export const handleError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof Error) {
        return new AppError(
            error.message,
            ErrorCodes.STORAGE_ERROR,
            { originalError: error }
        );
    }

    return new AppError(
        'An unexpected error occurred',
        ErrorCodes.STORAGE_ERROR,
        { originalError: error }
    );
};

export const validateName = (name: string): void => {
    if (!name.trim()) {
        throw new AppError(
            'Name cannot be empty',
            ErrorCodes.VALIDATION_ERROR
        );
    }

    if (name.length < 2) {
        throw new AppError(
            'Name must be at least 2 characters long',
            ErrorCodes.VALIDATION_ERROR
        );
    }

    if (name.length > 50) {
        throw new AppError(
            'Name must be less than 50 characters',
            ErrorCodes.VALIDATION_ERROR
        );
    }
}; 