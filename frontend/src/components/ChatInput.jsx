import React from "react";

export default function ChatInput({ value, onChange, onSend, icon }) {
  return (
    <div className="w-full flex justify-center p-5">
      <div className="w-full max-w-3xl flex items-center bg-[#303030] rounded-xl px-4 py-3 shadow-lg  ">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ask anything..."
          className="flex-1 text-white outline-none  text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSend();
            }
          }}
        />

        <button
          onClick={onSend}
          className="w-9 h-9 flex justify-center items-center rounded-full bg-white hover:bg-gray-200 transition"
        >
          <img src={icon} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
