type CoinsType = {
    coins: number;
}
type AddUrlErrorType = {
    url?: string;
    user_id?: string;
};

type SummaryType = {
    id: string;
    url: string;
    response?: string | null;
    user_id: number;
    created_at: Date;
    title: string;
  };