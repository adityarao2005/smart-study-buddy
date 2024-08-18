"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/questions/page.module.css";
import uploadImage from "@/assets/upload button.png"
import { useEffect, useState } from "react";

export default function Component() {
  const data = useSearchParams().get("data");
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ material: data })
      }).then(res => res.json()).then(data => { console.log(data); setCards(data.flashcards); setLoading(false); });
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const increment = () => {
    setIndex(index + 1);
  }

  return (
    <div className={styles.background}>
      {loading ? (
        <div className={styles.flipcard}>
          <div className={styles.flipcardinner}>

            <div className={styles.flipcardfront}>
              Loading...
            </div>
            <div className={styles.flipcardback}>
              Loading...
            </div>

          </div>
        </div>) : (

        index < cards.length ? (<div className={styles.flipcard}>
          <div className={styles.flipcard}>
            <div className={styles.flipcardinner}>

              <div className={styles.flipcardfront}>
                {cards[index].split("\n")[0]}
              </div>
              <div className={styles.flipcardback}>
                {cards[index].split("\n")[1]}
              </div>

            </div>

          </div>

          <div className={styles.generate} onClick={increment}>
            <button className={styles.generateButton}>Generate</button>
          </div></div>) : (
          <div className={styles.flipcard}>
            <div className={styles.flipcardinner}>

              <div className={styles.flipcardfront}>
                Congrats! You've finished the practice set!
              </div>
              <div className={styles.flipcardback}>
                Congrats! You've finished the practice set!
              </div>

            </div>
          </div>)
      )}
    </div>
  );
}