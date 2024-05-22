import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const NotFound = () => {
  return (
    <div className="w-full h-[calc(100dvh-60px)]  bg-gray-800 text-zinc-300 flex flex-col justify-center items-center text-2xl font-bold">
      <h1>404 - Page Not Found</h1>
      <p>Oops! Looks like you've reached a page that doesn't exist.</p>

      <HoverCard>
        <HoverCardTrigger className="hover:text-zinc-400">
        <Link to="/">Go back to the home page</Link>
        </HoverCardTrigger>
 
      </HoverCard>
    </div>
  );
};

export default NotFound;
