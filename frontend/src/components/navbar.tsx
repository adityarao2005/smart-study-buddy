"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/components/navbar.module.css";

export default function Component() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.navbar}>
            <div className={styles.banner}>Name {"&"} Logo</div>
            <div className={styles.space}></div>
            <div className={styles.chat}>Chat</div>
            <div className={styles.practice + " " + styles.active}>Practice</div>
            <div className={styles.solve}>Solve</div>
            <div className={styles.space}></div>
            <div className={styles.grayCircle}></div>
        </div>
    );
}