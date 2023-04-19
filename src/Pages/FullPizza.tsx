import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './FullPizza.module.scss'

const FullPizza: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title:string,
    price:number
  }>();

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
    <div className={styles.container}>
      <img src={pizza.imageUrl} className={styles.imgFullPizza}/>
<div className={styles.fullPizzaBody}>
      <h2 className={styles.titlePizza}>{pizza.title}</h2>
      <p className={styles.bodyPizza}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
        doloribus voluptatum explicabo possimus! Veniam nesciunt pariatur
        adipisci dolor, doloremque ullam assumenda, quod quam cum minima facere
        ipsa nobis fugit.
      </p>
      <h4 className={styles.pricePizza}>Price: {pizza.price}$</h4>
      </div>
    </div>
  );
};

export default FullPizza;
