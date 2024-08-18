"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/components/upload.module.css";

export default function Component() {
  const router = useRouter();
  const pathname = usePathname();

  return (
      <div className={styles.uploadbackground}>
        <div className={styles.uploadbackgroundcentering}>
          <div className={styles.title}><h1>paste study material to get started</h1></div>
          <div className={styles.uploadbox}>
            Prompt with lecture notes, study material, etc (instruction message with prompt ideas)....
            <div className={styles.buttonContainer}>
              <button className={styles.uploadbutton}>upload</button>
              <div><img src={"/images/2810455.png"} alt="My Image" /></div>
            </div>
            
          </div>
        </div>
      </div>
  );
}