import Image from "next/image";

interface SuggestionCardProps {
  showAddButton?: boolean;
}

export default function SuggestionCard({ showAddButton = true }: SuggestionCardProps) {
  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-3">
        <Image
          src="/user.svg"
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full bg-gray-100"
        />
        <div>
          <p className="font-medium text-[15px] text-gray-900">User Name</p>
          <p className="text-[13px] text-gray-500">@username</p>
        </div>
      </div>
      {showAddButton && (
        <button className="text-blue-500 hover:bg-blue-50 font-medium text-sm px-3 py-1.5 rounded-md transition-colors">
          Add Friend
        </button>
      )}
    </div>
  );
}
