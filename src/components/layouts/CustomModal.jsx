import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

const CustomModal = ({ title, description, inputPlaceholder, buttonText, onClick, trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/** You can customize the trigger button here */}
        <button>{trigger}</button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] text-white'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-white'>{title}</h1>
          <p>{description}</p>
          <input
            className='bg-transparent border border-white border-solid rounded-md p-2 mt-4'
            placeholder={inputPlaceholder}
          />
          <button
            className='bg-[#1663AE] border-r-2 border-[#1663AE] px-4 py-2 rounded-md mt-4 transition-transform transform hover:scale-105 active:scale-95'
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
