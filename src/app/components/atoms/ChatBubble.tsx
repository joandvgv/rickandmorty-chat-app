import clsx from "clsx";
import format from "date-fns/format";

type Props = {
  message: string;
  name: string;
  time: number;
  type?: "start" | "end";
  image?: string;
};

export default function ChatBubble(props: Props) {
  return (
    <div
      className={clsx("chat", props.type === "end" ? "chat-end" : "chat-start")}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={props.image} />
        </div>
      </div>
      <div className="chat-header space-x-1">
        <span>{props.name}</span>
        <time className="text-xs opacity-30">
          {format(new Date(props.time * 1000), "HH:mm")}
        </time>
      </div>
      <div className="chat-bubble">{props.message}</div>
    </div>
  );
}
