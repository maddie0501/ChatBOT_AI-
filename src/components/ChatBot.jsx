import React from "react";
import styles from "./ChatBot.module.css";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
import sampledata from "./sampleData.json";
import boy from '../assets/boy.png'

const ChatBot = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.section2}>
        <div className={styles.historyside}>
          <img src={logo} alt="logo" className={styles.minilogo} />
          <p className={styles.newchat}>New Chat</p>
          <img src={edit} alt="edit" />
          <button className={styles.past}>Past Conversations</button>
        </div>
      </div>
      <h2 className={styles.heading}>Bot AI</h2>
      <h2 className={styles.heading2}>How Can I Help You Today?</h2>
      <img src={logo} alt="logo" className={styles.logo} />

      <section>
        <div className={styles.grids}>
          <p>Hi, What is the weather</p>
          <p>Get immediate AI generated response</p>
        </div>

        <div > 
          {sampledata.map(({ id, question, response }) => (
              <div key={id} className={styles.chatbubble}>
              <p>{question}</p>

                <img src={boy} alt="boy" />
                {response}
                
              
                  <button>👍</button>
                  <button>👎</button>
                
              
            </div>
          ))}
        </div>
      </section>

      <div className={styles.endpart}>
        <footer className={styles.footer}>
          <form>
            <input type="text" className={styles.feedback} />
          </form>

          <button className={styles.btn1}>Ask</button>
          <button className={styles.btn2}>Save</button>
        </footer>
      </div>
    </div>
  );
};
export default ChatBot;
