export type CoinsType = {
    coins: number;
}

export type AddUrlErrorType = {
    url?: string;
    user_id?: string;
};

export type SummaryType = {
    id: string;
    url: string;
    response?: string | null;
    user_id: number;
    created_at: Date;
    title: string;
};