import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { apiCall } from "../utils/api";

interface Message {
    _id: string;
    text: string;
    senderId: {
        _id: string;
        firstName: string;
        photoUrl: string;
    };
    createdAt: string;
}

const DEFAULT_AVATAR =
    "https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg";

const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "";

    const isToday = date.toDateString() === new Date().toDateString();
    const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) return time;

    const day = date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
    });
    return `${day}, ${time}`;
};

export const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [targetUserDetails, setTargetUserDetails] = useState<{ name: string, photoUrl: string } | null>(null);
    const user = useSelector((store: RootState) => store.user);
    const userId = user?._id;
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        if (!targetUserId) return;
        let isMounted = true;

        const fetchChatMessages = async () => {
            try {
                const { data: { data } } = await apiCall(`/chat/${targetUserId}`, 'GET');
                if (isMounted) {
                    setMessages(data.chat.messages);
                    setTargetUserDetails(data.targetUser);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchChatMessages();

        return () => {
            isMounted = false;
        };
    }, [targetUserId]);
    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat", { name: user?.firstName, userId, targetUserId })
        socket.on('messageReceived', (msg: Message) => {
            setMessages((prev) => [
                ...prev,
                {
                    ...msg
                },
            ]);
        })
        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])
    const handleSend = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage", { name: user?.firstName, userId, targetUserId, text: trimmed })
        setInput("");
    };

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col h-[72vh] min-h-[480px] bg-base-200/70 backdrop-blur-md border border-base-content/10 shadow-xl rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-base-300/60 border-b border-base-content/10 shrink-0">
                <Link
                    to="/connections"
                    className="btn btn-sm btn-ghost rounded-full gap-1.5 text-base-content/80 hover:text-base-content hover:bg-base-content/10 transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Connections
                </Link>

                <div className="flex items-center gap-3 min-w-0">
                    {targetUserDetails ? (
                        <>
                            <div className="relative shrink-0">
                                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-base-content/20 bg-base-300 shadow-sm">
                                    <img
                                        src={targetUserDetails.photoUrl || DEFAULT_AVATAR}
                                        alt={targetUserDetails.name}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                                        }}
                                    />
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success ring-2 ring-base-300" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h1 className="text-sm sm:text-base font-bold tracking-tight text-base-content truncate">
                                    {targetUserDetails.name}
                                </h1>
                                <span className="text-[11px] text-base-content/50 leading-none">
                                    Connected
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                            <h1 className="text-sm sm:text-base font-bold tracking-tight text-base-content truncate font-mono">
                                {targetUserId}
                            </h1>
                        </>
                    )}
                </div>

                <div className="w-20 hidden sm:block" />
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="w-14 h-14 rounded-2xl bg-base-300/80 border border-base-content/10 flex items-center justify-center text-2xl shadow-md mb-3">
                            💬
                        </div>
                        <p className="text-sm font-medium text-base-content/70">
                            No messages yet
                        </p>
                        <p className="text-xs text-base-content/45 mt-1">
                            Start the conversation below.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId?._id === userId;
                        const senderName =
                            msg.senderId?.firstName ||
                            (isMe ? user?.firstName : targetUserDetails?.name) ||
                            "User";
                        const senderPhoto =
                            msg.senderId?.photoUrl ||
                            (isMe ? user?.photoUrl : targetUserDetails?.photoUrl) ||
                            DEFAULT_AVATAR;

                        return (
                            <div
                                key={msg._id}
                                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                            >
                                <div className="chat-image avatar">
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-base-content/20 bg-base-300 shadow-sm">
                                        <img
                                            src={senderPhoto}
                                            alt={senderName}
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header text-[11px] font-medium text-base-content/60 mb-1">
                                    {senderName}
                                </div>
                                <div
                                    className={`chat-bubble text-sm leading-relaxed shadow-sm ${
                                        isMe
                                            ? "bg-base-content/85 text-black"
                                            : "bg-base-300/90 text-base-content border border-base-content/10"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                <div className="chat-footer opacity-40 text-[11px] mt-1">
                                    {formatMessageTime(msg.createdAt)}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
                onSubmit={handleSend}
                className="flex items-center gap-3 px-4 py-3.5 bg-base-300/60 border-t border-base-content/10 shrink-0"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="input input-bordered flex-1 rounded-full bg-base-200/80 border-base-content/15 focus:border-base-content/50 focus:outline-none text-sm text-base-content placeholder:text-base-content/40"
                />
                <button
                    type="submit"
                    className="btn btn-sm sm:btn-md btn-outline text-base-content border-base-content hover:bg-base-content hover:text-black hover:border-base-content rounded-full px-5 gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    Send
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};
