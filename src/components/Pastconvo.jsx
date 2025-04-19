import React ,{useState,useEffect} from "react";
import styles from "./ChatBot.module.css";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
import boy from "../assets/boy.png";

function PastConvo() {

    const [savedChats, setSavedChats] = useState([]);


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("chatHistory")) || [];
        setSavedChats(data);
    }, []);
    
  return (
    <div className={styles.wrapper}>
      {/* left side */}
      <div className={styles.leftSide}>
        <div className={styles.actioButton}>
          <img src={logo} alt="logo" className={styles.minilogo} />
          <p className={styles.newchat}>New Chat</p>
          <img src={edit} alt="edit" height={30} />
        </div>
        <button className={styles.past}>Past Conversations</button>
      </div>

      {/* right side */}
      <div className={styles.rightSide}>
      
        {/* body */}
        <section className={styles.chatbody}>
  <div>
    <h2 className={styles.convoheading}>Conversation History</h2>
    <h3 className={styles.convosubhead}>Today's Chats</h3>
  </div>

  <div className={styles.historyWrapper}>
    {savedChats.length === 0 ? (
      <p>No saved conversations found.</p>
    ) : (
      savedChats.map((session, index) => (
        <div key={index} className={styles.sessionBox}>
     
          {session.map((chat, i) => (
            <div key={i} className={styles.chatItem}>
           
              <div className={styles.chat}>
                <img
                  src={boy}
                  alt="User"
                  style={{
                    borderRadius: "50%",
                    width: "65px",
                    height: "69px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  <strong>You</strong>
                  <p>{chat.question}</p>
                  <p><em>{chat.time}</em></p>
                </div>
              </div>

              {/* Bot response */}
              <div className={styles.chat}>
                <img
                  src={logo}
                  alt="Soul AI"
                  style={{
                    borderRadius: "50%",
                    width: "70px",
                    height: "69px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  <strong>Soul AI</strong>
                  <p>{chat.response}</p>
                  <p><em>{chat.time}</em></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))
    )}
  </div>
</section>


        {/* footer */}
        <div>
         <footer className={styles.footer}>
                    <form  style={{width:"100%"}}>
                      <input
                        type="text"
                        className={styles.feedback}
                        placeholder="Type your question..."
                        
                      />
                    </form>
                    <div style={{width:"fit", display:"flex", gap:"10px"}}>
                      <button type="submit" className={styles.btn1}>
                        Ask
                      </button>
                      <button
                        type="button"
                        className={styles.btn2}
                        
                      >
                        Save
                      </button>
                    </div>
                  </footer>
        </div>
      </div>
          </div>
          
  );
}

export default PastConvo;
