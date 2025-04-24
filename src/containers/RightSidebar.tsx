"use client";

import SuggestionCard from "@/components/Card/SuggestionCard";

export default function RightSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-[25%] h-[calc(100vh-3.5rem)] mt-[3.5rem] pt-4 px-4 overflow-y-auto fixed right-0">
      {/* Friend Suggestions */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-500">People You May Know</h4>
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
            See All
          </button>
        </div>
        <div className="space-y-4">
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-500">Contacts</h4>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <SuggestionCard showAddButton={false} />
          <SuggestionCard showAddButton={false} />
          <SuggestionCard showAddButton={false} />
          <SuggestionCard showAddButton={false} />
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-gray-500 mt-4 px-4">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Advertising</a>
          <span>·</span>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
        <p className="mt-2">© 2024 FestivaSync</p>
      </div>
    </div>
  );
}
