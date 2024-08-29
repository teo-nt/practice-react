export interface Movie {
    id: number,
    title: string,
    url: string,
    price: number
}

export interface MovieStore {
    id: number,
    title: string,
    url: string,
    price: number,
    quantity: number
}

/*export const Movies: Movie[] = [
    {
        id: 1,
        title: 'Avengers',
        url: 'https://play-lh.googleusercontent.com/I6Ec0wu8PPuL9I66PVwnYsoB7IRoVa5Y6EpqnFZDcm_tz1Z5cyu4YWRqzu0dek3VYiRAcHG2P-FfL-L9SCg'
    },
    {
        id: 2,
        title: 'The Equalizer',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMwKZ4qv3EF1vPR3drTouE9HN1HZ3At-XXA&s'
    }
]*/