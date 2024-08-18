"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/practice/page.module.css";
import uploadImage from "@/assets/upload button.png"
import { useState } from "react";
import Link from "next/link";

export default function Component() {
    const [data, setData] = useState("");

    return (
        <div className={styles.uploadbackground}>
            <div className={styles.uploadbackgroundcentering}>
                <div className={styles.title}><h1>Paste study material to get started</h1></div>
                <textarea className={styles.uploadbox} placeholder="
                    Prompt with lecture notes, study material, etc (instruction message with prompt ideas)...." value={data} onChange={(e) => setData(e.target.value)}></textarea>
                <Link className={styles.uploadbutton} href={{
                    pathname: "/questions",
                    query: { data: data }
                }}><img src={uploadImage.src} style={{ width: "100px", height: "100px" }} /></Link>
            </div>
        </div>
    );
}