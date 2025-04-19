import React, { useState, useRef } from "react";
import styles from "./ChatBot.module.css";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
import sampledata from "./sampleData.json";
import boy from "../assets/boy.png";
// import { useNavigate } from "react-router-dom";
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
          }}
        >
          <h2>Provide Additional Feedback</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" />
            <div>
              <button type="submit" onClick={isClose}>
                Submit Feedback
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
    localStorage.setItem("chatHistory", JSON.stringify([...prev, ...chatHistory]));
    alert("Chat saved!");
  };

  return (
    <div className={styles.wrapper}>
      {/* left side */}
      <div className={styles.leftSide}>
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
          <h1>Bot AI</h1>
        </header>

        {/* body */}
        <section className={styles.chatbody}>
          {chatHistory.length > 0 ? (
            <>
              {chatHistory.map(({ question, response, time }, index) => (
                <div key={index}>
                  <div className={styles.chat}>
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
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <span>
              <input
                type="text"
                placeholder="Message Bot AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </span>
            <div
              style={{
                width: "fit",
                display: "flex",
                gap: "10px",
                marginTop: "10px",
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
