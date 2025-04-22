import { useEffect, useRef, useState } from "react";
import { callGPT } from "../api/gpt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MainPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const submit_click_handler = async (
    e: React.FormEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await callGPT(input);
      setMessages([...newMessages, { role: "assistant", content: result }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: err.message || "에러 발생" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="m-4 p-2 border-2 flex flex-col h-screen">
      {/*대화 영역*/}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.role === "user" ? "🙋 사용자" : "🤖 GPT"}</strong>
            {/* ✅ 코드 블록 감지
            {msg.content.split(/```/g).map((block, i) =>
              i % 2 === 1 ? (
                <SyntaxHighlighter
                  key={i}
                  language="tsx"
                  style={oneDark}
                  customStyle={{
                    backgroundColor: "#1e1e1e",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  {block}
                </SyntaxHighlighter>
              ) : (
                <p key={i} className="whitespace-pre-wrap">
                  {block}
                </p>
              )
            )} */}
            <ReactMarkdown
              children={msg.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline ? (
                    <SyntaxHighlighter
                      language={match?.[1] || "tsx"}
                      style={oneDark}
                      customStyle={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: "8px",
                        padding: "1rem",
                      }}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {/*입력창 (하단 고정)*/}
      <form onSubmit={submit_click_handler} className="border-t p-4 bg-white">
        <textarea
          className="w-full border p-2 rounded resize-none"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="GPT에게 질문하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit_click_handler(e);
            }
          }}
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "요청 중..." : "보내기"}
        </button>
      </form>
      <hr />
    </div>
  );
};

export default MainPage;
