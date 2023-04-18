import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./FullPizza.module.scss";
import { Loader } from "semantic-ui-react";

const FullPizza = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6412fbee3b710647375b8736.mockapi.io/PizzaItems/" + params.ID
        );
        setPizza(data);
        console.log(pizza);
      } catch (error) {
        console.log(error, "ERROR");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  console.log(params, "params");

  if (!pizza) {
    return (
      <div className={styles.root_loading}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
        doloribus voluptatum explicabo possimus! Veniam nesciunt pariatur
        adipisci dolor, doloremque ullam assumenda, quod quam cum minima facere
        ipsa nobis fugit.
      </p>
      <h4>{pizza.price}$</h4>
    </div>
  );
};

export default FullPizza;
