"use client"
import styles from "@/app/chat/page.module.css";
import { Oxygen } from "next/font/google";
import picture from "@/assets/send message button.png";
import icon from "@/assets/icon.png";
import { KeyboardEventHandler, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MarkdownWithMath from "@/components/markdown";

const oxygen = Oxygen({ subsets: ["latin"], display: "swap", weight: "400" });

interface Message {
    text: string;
    sender: "me" | "AI";
}

function MessageView({ message }: { message: Message }) {
    return (
        <div className={styles.message + " " + (message.sender == "me" ? styles.me : styles.them)}>
            <div style={{ flex: 1 }}></div>
            <div className={styles.text}>
                <MathJax>
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                </MathJax>
            </div>
            {message.sender != "me" && <div className={styles.grayCircle}><img src={icon.src} style={{ width: "35px", height: "35px", padding: "2.5px" }} /></div>}
        </div>
    );
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([{ text: "Hi there! I'm your study buddy here to help you with your homework, answer questions, and support you in your studies. Let\'s chat!", sender: "AI" }]);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (value.trim() == "") return;
        const value0 = value.trim();
        messages.push({ text: value0, sender: "me" });
        setMessages([...messages]);
        setValue("");
        setLoading(true);
        const response = await fetch("http://localhost:8000/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: value0 })
        });
        const data = await response.json();
        messages.push({ text: data.response, sender: "AI" });
        setMessages([...messages]);
        setLoading(false);
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && loading == false) {
            sendMessage();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                <MathJaxContext>
                    {messages.map((message, index) => (
                        <MessageView key={index} message={message} />
                    ))}
                </MathJaxContext>
            </div>
            <div className={styles.input}>
                <input type="text" placeholder="Type your message..." value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className={oxygen.className} />
                <button className={styles.button} onClick={sendMessage} disabled={loading}><img src={picture.src} /></button>
            </div>
        </div>
    );
}