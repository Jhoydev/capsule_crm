import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/hooks/auth";

const AgentEdition: React.FC = () => {
  const { register, setValue, getValues } = useFormContext();
  const { user } = useAuth();
  return (
    <div className="border p-4 rounded-md h-full shadow">
      <h3 className="text-sm font-bold mb-6">Agent details</h3>
      <div className="flex items-center">
        <Avatar className="h-[80px] w-[80px] mr-4">
          <AvatarImage src={user?.avatar_url ?? "photo"} />
          <AvatarFallback>{user?.name.substring(0, 2).toUpperCase() ?? "JS"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span>{user?.name ?? "Jhoseph"}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentEdition;
