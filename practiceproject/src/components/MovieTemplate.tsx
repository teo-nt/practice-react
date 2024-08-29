import './MovieTemplate.css'

const MovieTemplate: React.FC<{ id: number, price: number, title: string, url: string, children: string | undefined, quantity: number | null }> = ({ id, price, quantity, title, url, children }) => {
    return (
        <div className="col mb-4">
            <div className="card h-100">
                <img src={url} className="card-img-top imgSizing" alt={title} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    {quantity && <h5>Quantity: {quantity}</h5>}
                    <h5>{price}$</h5>
                    <div className="mt-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>);
}

export default MovieTemplate;