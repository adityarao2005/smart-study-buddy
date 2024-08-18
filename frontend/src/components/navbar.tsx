"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/components/navbar.module.css";
import Link from "next/link";

export default function Component() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.navbar}>
            <div className={styles.banner}>
                <Link href="/" className={styles.link}>Name {"&"} Logo</Link>
                <div style={{ height: "10px" }}></div>
            </div>
            <div className={styles.space}></div>

            <div>
                <div style={{ height: "10px" }}></div>
                <Link href="/chat" className={styles.link + " " + styles.chat + " " + (pathname == "/chat" ? styles.active : "")}>Chat</Link>
            </div>
            <div>
                <div style={{ height: "10px" }}></div>
                <Link href="/practice" className={styles.link + " " + styles.chat + " " + (pathname == "/practice" || pathname == "/" ? styles.active : "")}>Practice</Link>
            </div>

            <div className={styles.space}></div>
            <div>
                <div className={styles.grayCircle}></div>
                <div style={{ height: "10px" }}></div>
            </div>
        </div>
    );
}