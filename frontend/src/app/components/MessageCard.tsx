import Image from "next/image";

export const MessageCard = ({
  name,
  avatar,
  location,
  suggestion ,
  sendRequest
}: {
  name: string;
  avatar: string;
  location: string;
  suggestion ?: boolean;
  sendRequest?:()=>void
}) => {
  return (
    <div className="flex items-center justify-between hover:bg-white/5 rounded-xl px-2 py-2 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full w-9 h-9"
          src={avatar}
          width={36}
          height={36}
          alt="profile"
        />
        <div>
          <div className="text-sm text-white font-medium">{name}</div>
          <div className="text-xs text-white/30">{location}</div>
        </div>
      </div>
      {suggestion && (
        <button 
          onClick={sendRequest} 
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Image src={"/addFriendWhite.png"} width={20} height={20} alt="add friend"/>
        </button>
      )}
    </div>
  );
};
