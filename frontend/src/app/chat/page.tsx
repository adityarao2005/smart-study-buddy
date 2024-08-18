import styles from "@/app/chat/page.module.css";
import { Oxygen } from "next/font/google";
import picture from "@/assets/send message button.png";
import icon from "@/assets/icon.png";

const oxygen = Oxygen({ subsets: ["latin"], display: "swap", weight: "400" });

interface Message {
    text: string;
    sender: "me" | "AI";
}

function MessageView({ message }: { message: Message }) {
    return (
        <div className={styles.messages}>
            <div className={styles.message + " " + (message.sender == "me" ? styles.me : styles.them)}>
                <div style={{ flex: 1 }}></div>
                <div className={styles.text}>
                    {message.text}
                </div>
                {message.sender != "me" && <div className={styles.grayCircle}><img src={icon.src} style={{ width: "35px", height: "35px", padding: "2.5px" }} /></div>}
            </div>
        </div>
    );
}

export default function Page() {
    const messages: Message[] = [{ text: "Hello!", sender: "AI" }, { text: "Hi!", sender: "me" }];

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                {messages.map((message, index) => (
                    <MessageView key={index} message={message} />
                ))}
            </div>
            <div className={styles.input}>
                <input type="text" placeholder="Type your message..." className={oxygen.className} />
                <button className={styles.button}><img src={picture.src} /></button>
            </div>
        </div>
    );
}