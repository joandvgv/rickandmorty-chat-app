import clsx from "clsx";

type Props = {
  type?: "start" | "end";
  image?: string;
  message: string;
};

export default function ChatBubble(props: Props) {
  return (
    <div
      className={clsx("chat", props.type === "end" ? "chat-end" : "chat-start")}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" />
        </div>
      </div>
      <div className="chat-bubble">{props.message}</div>
    </div>
  );
}
