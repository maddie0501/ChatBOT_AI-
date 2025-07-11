import React, { useState, useRef } from "react";
import styles from "./ChatBot.module.css";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
import sampledata from "./sampleData.json";
import boy from "../assets/boy.png";
import thumbsup from "../assets/thumbsup.png";
import thumbsdown from "../assets/thumbsdown.png";
import { Link } from "react-router-dom";

const Feedback = ({ isClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    isClose();
  };

  return (
    <div style={{ position: "fixed", inset: "0" }}>
      <div
        style={{
          display: "grid",
          position: "absolute",
          inset: "0",
          placeItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(4px)",  
        }}
      >
        <div
          style={{
            backgroundColor: " #FAF7FF",
            padding: "16px",
            boxShadow: "-4px 4px 10px 0px #00000040",
            borderRadius: "10px",
            

          }}
        >
          <h2 style={{padding:"10px"}}>Provide Additional Feedback</h2>
          <form onSubmit={handleSubmit} >
            <input type="text" style={{width:"400px",height:"150px", borderRadius:"10px"}}/>
            <div style={{padding:"10px",display:"flex", justifyContent:"end"}}>
              <button type="submit" onClick={isClose} style={{backgroundColor: "#D7C7F4", padding:"8px", border:"none",borderRadius:"5px"}}>
                Submit 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setOpen] = useState(false);

  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const unmatchedCount = useRef(0); // track how many unknow questions
  //   const navigate = useNavigate();

  //   const currentTime = new Date().toLocaleTimeString();

  const fallbackResponses = [
    "Sorry, Did not understand your query!",
    "Hi there. How can I assist you today?",
    "As an AI Language Model, I don't have the details.",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    const match = sampledata.find(
      (item) => item.question.toLowerCase() === trimmed.toLowerCase()
    );

    let response;
    if (match) {
      response = match.response;
      unmatchedCount.current = 0;
    } else {
      if (unmatchedCount.current === 0) {
        response = "Sorry, Did not understand your query!";
      } else {
        response =
          fallbackResponses[unmatchedCount.current % fallbackResponses.length];
      }
      unmatchedCount.current += 1;
    }

    const newChat = {
      question: trimmed,
      response,
      time: new Date().toLocaleTimeString(),
    };

    setChatHistory((prev) => [...prev, newChat]);
    setInput("");
  };

  const handleSave = () => {
    const prev = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const flatPrev = Array.isArray(prev) ? prev : [];
    const flatCurrent = Array.isArray(chatHistory) ? chatHistory : [];

    localStorage.setItem(
      "chatHistory",
      JSON.stringify([...flatPrev, ...flatCurrent])
    );
    alert("Chat saved!");
  };



  return (
    <div className={styles.wrapper}>
      {/* left side */}
      <div className={`${styles.leftSide} ${isSidebarOpen ? styles.open : ""}`}>
        <div style={{position:"fixed", inset:"0", zIndex:"-1",display:`${isSidebarOpen ? 'block' : 'none'}`}} onClick={() => setIsSidebarOpen(false)} />
        <div className={styles.actioButton}>
          <img src={logo} alt="logo" className={styles.minilogo} />
          <Link to="/" className={styles.newchat}>
            New Chat
          </Link>
          <img src={edit} alt="edit" height={30} />
        </div>
        <Link to="/history" className={styles.past}>
          Past Conversations
        </Link>
      </div>

      {/* right side */}
      <div className={styles.rightSide}>
        {/* header */}
        <header className={styles.header}>
          <div
            className={styles.hamburger}
            onClick={toggleSidebar}
          >
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
          </div>

          <h1 >Bot AI</h1>
        </header>

        {/* body */}
        <section className={styles.chatbody}>
          {chatHistory.length > 0 ? (
            <>
              {chatHistory.map(({ question, response, time }, index) => (
                <div key={index}>
                  <div className={styles.chat} >
                    <img
                      src={boy}
                      alt="boy"
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
                      <p>{question}</p>
                      <p>{time}</p>
                    </div>
                  </div>

                  <div className={styles.airesponse}>
                    <img
                      src={logo}
                      alt="logo"
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
                      <strong>
                        <span>Soul AI</span>
                      </strong>
                      <p>{response}</p>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          paddingTop: "10px",
                        }}
                      >
                        <p>{time}</p>
                        <img
                          src={thumbsup}
                          alt="thumbsup"
                          onClick={() => setOpen(true)}
                        />
                        <img
                          src={thumbsdown}
                          alt="thumbsdown"
                          onClick={() => setOpen(true)}
                        />
                      </div>
                      {isOpen && <Feedback isClose={() => setOpen(false)} />}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                <h2>How Can I Help You Today?</h2>
                <img src={logo} alt="logo" width={100} />

                <section className={styles.container}>
                  <div className={styles.boxs}>
                    <p>Hi, What is the weather</p>
                    <p>Get immediate AI generated response</p>
                  </div>

                  <div className={styles.boxs}>
                    <p>Hi, What is my location</p>
                    <p>Get immediate AI generated response</p>
                  </div>

                  <div className={styles.boxs}>
                    <p>Hi, What is the temperature</p>
                    <p>Get immediate AI generated response</p>
                  </div>

                  <div className={styles.boxs}>
                    <p>Hi, how are you</p>
                    <p>Get immediate AI generated response</p>
                  </div>
                </section>
              </div>
            </>
          )}
        </section>

        {/* footer */}
        <div>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
            className={styles.footer}
          >
            <span>
              <input
                type="text"
                placeholder="Message Bot AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
              />
            </span>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button type="submit" className={styles.btn1}>
                Ask
              </button>
              <button
                type="button"
                className={styles.btn2}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
