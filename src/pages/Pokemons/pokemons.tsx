import { useState } from "react";
import Counter from "../../components/Counter";
import Heading from "../../components/Heading";
import List from "../../components/List";
import { Section } from "../../components/Section";

function Pokemons() {
  const [count, setCount] = useState(1)

  return (
    <>
      <Heading title={"Hello Trainer!"} />
      <Section>Example Section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List 
        items={["Pikachu", "Charmander", "Mew"]}
        render={(item: string) => <span>{item}</span>} 
      ></List>
    </>
  )
}

export default Pokemons;
