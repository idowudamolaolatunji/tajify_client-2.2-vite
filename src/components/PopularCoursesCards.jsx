import { Link } from "react-router-dom";



function PopularCoursesCards({ title, imagePath }) {
    return (
        <figure className="card__figure">
              <Link to="/coming-soon">
                {/* <img className="card__figure--image" src={imagePath} alt={title} /> */}
                <img className="" src={imagePath} alt={title} />
                <p className="card__figure--title">{title}</p>
              </Link>         
        </figure>
    )
}

export default PopularCoursesCards;