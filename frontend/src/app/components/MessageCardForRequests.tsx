import Image from "next/image";

export const MessageCardForRequests = ({
  name,
  avatar,
  location,
  acceptRequest
}: {
  name: string;
  avatar: string;
  location: string;
  acceptRequest: () => any
}) => {
  return (
    <div className="flex items-center justify-between hover:bg-white/5 rounded-xl px-2 py-2 transition-colors">
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
      <div className="flex gap-2">
        <button 
          onClick={acceptRequest} 
          className="p-1.5 hover:bg-green-500/20 rounded-lg transition-colors"
        >
          <Image src="/requests/accept.png" width={20} height={20} alt="accept" />
        </button>
        <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors">
          <Image src="/requests/reject.png" width={20} height={20} alt="reject" />
        </button>
      </div>
    </div>
  );
};