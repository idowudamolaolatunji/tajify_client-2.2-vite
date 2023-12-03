import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Card({ title, imagePath  }) {
  const { token } = useAuthContext();

  return (
    <Link to={`/category/${title}`}>
      <figure className="card__figure">
        <img className="" src={imagePath} alt={title} />
        <p className="card__figure--title">{title}</p>
      </figure>
    </Link>
  );
}

export default Card;
