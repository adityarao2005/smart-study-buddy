"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/questions/page.module.css";
import uploadImage from "@/assets/upload button.png"

export default function Component() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.background}>
          <div className={styles.flipcard}>
            <div className={styles.flipcardinner}>
             
                <div className={styles.flipcardfront}>
                  What is the integral of sin(x) with respect to x
                </div>
                <div className={styles.flipcardback}>
                  -cos(x)
                </div>
              
            </div>

          </div>

          <div className={styles.generate}>
            <button className={styles.generateButton}>Generate</button>
          </div>
        </div>
    );
}