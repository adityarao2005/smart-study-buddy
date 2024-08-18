"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/practice/page.module.css";
import uploadImage from "@/assets/upload button.png"

export default function Component() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.uploadbackground}>
            <div className={styles.uploadbackgroundcentering}>
                <div className={styles.title}><h1>Paste study material to get started</h1></div>
                <div className={styles.uploadbox}>
                    Prompt with lecture notes, study material, etc (instruction message with prompt ideas)....
                    <div className={styles.buttonContainer}>
                        <button className={styles.uploadbutton}>
                            <img src={uploadImage.src} alt="My Image" className={styles.image} />{" "} Upload
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}