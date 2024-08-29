export interface MovieCreateDTO {
    title: string;
    url: string;
    price: number;
    rate: number;
    releaseDate: string;
    screenYear: number;
    genre: string | null;
    director: string | null;
    plot: string | null;
    country: string | null;
    writer: string | null;
    language: string | null;
    description: string | null;
    leadActor: string | null;
    type: string | null;
}