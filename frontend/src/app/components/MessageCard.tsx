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
    <div className="flex border justify-between  border-x-0 border-y-1 border-gray-300/10  hover:bg-[#242627] w-full px-1 py-2 2xl:px-2 2xl:py-3 rounded-xl">
      <div className="flex ">
        <Image
          className="rounded-full w-10 h-10 2xl:w-12 2xl:h-12 "
          src={avatar}
          width="50"
          height="50"
          alt="profile image"
        />
        <div className="flex flex-col justify-center items-start pl-4">
          <div className="text-sm 2xl:text-lg">{name}</div>
          <div className="flex text-xs 2xl:text-sm text-gray-300 gap-2">
            <div className="text-gray-400">{location}</div>
          </div>
        </div>
      </div>
      {suggestion && (
        <button onClick={sendRequest} className="hover:scale-90">
          <Image src={"/addFriendWhite.png"} width={"50"} height={"50"} alt="add friend"/>
        </button >
      )}
    </div>
  );
};
