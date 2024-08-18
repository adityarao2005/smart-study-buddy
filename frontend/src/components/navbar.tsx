"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/components/navbar.module.css";
import Link from "next/link";

export default function Component() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.navbar}>
            <Link href="/" className={styles.link}><div className={styles.banner}>Name {"&"} Logo</div></Link>
            <div className={styles.space}></div>

            <div>
                <Link href="/chat" className={styles.link + " " + styles.chat + " " + (pathname == "/chat" ? styles.active : "")}>Chat</Link>
            </div>
            <div>
                <Link href="/practice" className={styles.link + " " + styles.chat + " " + (pathname == "/practice" || pathname == "/" ? styles.active : "")}>Practice</Link>
            </div>

            <div className={styles.space}></div>
            <div style={{ width: "200px", minWidth: "200px", display: "flex", flexDirection: "row-reverse" }}>
                <div className={styles.grayCircle}></div>
            </div>
        </div>
    );
}