import React from "react";

const NewMessage = () => {
  return (
    <div className="h-[422px] pb-6 bg-white flex-col justify-center items-center gap-6 inline-flex">
      <div className="w-[648px] px-5 py-4 bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)] justify-between items-center inline-flex">
        <div className="text-[#1d1f26] text-base font-medium font-['Inter'] leading-snug">
          New Message
        </div>
        <div className="w-[18px] h-[18px] justify-center items-center flex">
          <div className="w-[18px] h-[18px] relative"></div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="h-[76px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-[#1d1f26] text-sm font-normal font-['Inter'] leading-snug">
            Teacher:
          </div>
          <div className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-center items-center gap-[493px] inline-flex overflow-hidden">
            <div className="text-[#8c93a3] text-base font-normal font-['Inter'] leading-normal">
              Select...
            </div>
            <div className="w-4 h-4 justify-center items-center inline-flex">
              <div className="w-4 h-4 relative"></div>
            </div>
          </div>
        </div>
        <div className="w-[604px] h-[156px] flex-col justify-start items-start gap-1.5 flex overflow-hidden">
          <div className="text-[#1d1f26] text-sm font-normal font-['Inter'] leading-snug">
            Tin nhắn
          </div>
          <div className="h-32 pl-[18px] pr-96 pt-[13px] pb-[91px] bg-white border border-[#e8eaef] justify-start items-center inline-flex overflow-hidden">
            <div className="text-[#8c93a3] text-base font-normal font-['Inter'] leading-normal">
              Write your message here...
            </div>
          </div>
        </div>
      </div>
      <div className="w-[600px] justify-between items-center inline-flex">
        <div className="px-6 bg-[#f4f7f9] justify-center items-center gap-3 flex">
          <div className="text-[#1d1f26] text-base font-semibold font-['Inter'] capitalize leading-[48px]">
            Cancel
          </div>
        </div>
        <div className="px-6 bg-[#ff6636] justify-center items-center gap-3 flex">
          <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-[48px]">
            Send Message
          </div>
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;