function category(props) {
    return (
        <figure className="category">
            <img className="category__image" src={props.image} alt={props.name} />
            <h3 className="category__heading">
                {props.title}
            </h3>
            <span className="category__details">
                <span className="category__details--author">
                    <img className="category__author--image" src={props.authorImg} alt={`${props.authorName}} profile`} />
                    <p className="category__author--name">{props.authorName}</p>
                </span>
                <span className="category__details--date">
                    {/* icon goes here */}
                    <div className="category__date">{props.date}</div>
                </span>
                <span className="category__details--comments">
                    {/* icon goes here aswell */}
                    <p className="category__comment">{props.comment} com.</p>
                </span>
            </span>
             
        </figure>
    )
}

export default category
