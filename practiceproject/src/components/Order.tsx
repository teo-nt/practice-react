import { MovieStore } from "../Models/Movie";
import MovieTemplate from "./MovieTemplate";

export default function Order(props: { orderDate: string, orderId: number, movies: MovieStore[] }) {
    return (
        <div>
            <h2>Order id: {props.orderId} - Order Date: {new Date(props.orderDate).toLocaleString('el-GR')}</h2>

            <div className="d-flex gap-2">
                {props.movies.map((movie: MovieStore) => (

                    <MovieTemplate key={movie.id} id={movie.id} price={movie.price} quantity={movie.quantity} title={movie.title} url={movie.url}></MovieTemplate>
                               
                ))}   
            </div>  
        </div>
    )
}