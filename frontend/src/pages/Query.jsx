import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

function Query() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
  fetchHistory();
}, []);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

const fetchHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/query/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const history = [];

    response.data
      .reverse()
      .forEach((chat) => {
        history.push({
          sender: "user",
          text: chat.query,
        });

        history.push({
          sender: "bot",
          text: chat.response,
        });
      });

    setMessages(history);

  } catch (error) {
    console.log(error);
  }
};

const handleClearChat = async () => {
  const result = await Swal.fire({
    icon: "warning",
    title: "Clear Chat History",
    text: "This will permanently delete all your chat history.",
    showCancelButton: true,
    confirmButtonText: "Clear Chat",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      "http://localhost:5000/api/query/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages([]);

    Swal.fire({
      icon: "success",
      title: "Chat Cleared",
      text: "Your chat history has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {
    console.log(error);
    console.log(error.response);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text:
        error.response?.data?.message ||
        "Unable to clear chat history.",
    });
  }
};

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const result = await axios.post(
        "http://localhost:5000/api/query",
        {
          question: currentQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: result.data.answer,
        },
      ]);
    } 
    catch (error) {
  console.log("Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  toast.error(
    error.response?.data?.message || "Failed to process query"
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="max-w-6xl mx-auto h-[82vh] flex flex-col">

      {/* Header */}

      <div className="mb-6">
        {/* <h1 className="text-4xl font-bold text-gray-800">
           AI Assistant
        </h1> */}

        <p className="text-gray-500 mt-2">
          Ask questions about uploaded documents.
        </p>
      </div>

      {/* Chat Box */}

      <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">

        {/* Top */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 flex justify-between items-center">

          <div className="flex items-center gap-3">
  <FaRobot size={24} />

  <div>
    <h2 className="font-semibold text-lg">
      Document Assistant
    </h2>

    <p className="text-blue-100 text-sm">
      Online
    </p>
  </div>
</div>

<button
  onClick={handleClearChat}
  className="flex items-center gap-2 bg-white/20 hover:bg-red-500 px-4 py-2 rounded-xl transition"
>
  <FaTrash />
  Clear Chat
</button>

        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">

          {messages.length === 0 && (

            <div className="text-center mt-20">

              <FaRobot className="mx-auto text-6xl text-blue-500 mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                Start a Conversation
              </h2>

              <p className="text-gray-500 mt-2">
                Ask anything about your uploaded documents.
              </p>

            </div>

          )}

          {messages.map((msg, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`flex items-start gap-3 max-w-[75%] ${
                  msg.sender === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    msg.sender === "user"
                      ? "bg-blue-600"
                      : "bg-indigo-600"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <FaUser />
                  ) : (
                    <FaRobot />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-5 py-4 shadow ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>

              </div>

            </motion.div>

          ))}

          {/* Typing Animation */}

          {loading && (

            <div className="flex items-start gap-3">

              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <FaRobot />
              </div>

              <div className="bg-white border rounded-2xl px-5 py-4 shadow">

                <div className="flex gap-2">

                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>

                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>

                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>

                </div>

              </div>

            </div>

          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* Input */}

        <div className="border-t bg-white p-5">

          <div className="flex gap-4">

            <textarea
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 border rounded-2xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 rounded-2xl flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
            >
              <FaPaperPlane size={20} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Query;