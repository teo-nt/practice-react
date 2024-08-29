import { MovieStore } from "./Movie";

export interface OrderToSubmit {
    userId: number;
    moviesToOrder: MovieStore[];
}

export interface OrderReadOnly {
    orderId: number;
    movies: MovieStore[];
    orderDate: string;
}