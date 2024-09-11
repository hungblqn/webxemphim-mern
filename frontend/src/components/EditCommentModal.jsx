import React, { useState, useEffect } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import axios from 'axios';
import { ServerAddress } from '../../config';

const EditCommentModal = ({ isOpen, onClose, currentContent, currentCommentId, updateComments }) => {
  const [content, setContent] = useState('');

  //Hiển thị nội dung
  useEffect(() => {
    setContent(currentContent);
  }, [currentContent])


  const EditComment = () => {
    if(content === ""){
      alert('Bình luận không được rỗng!');
      return;
    }
    const data = {
      content: content
    };
    axios.put(`${ServerAddress}/comment/user-edit-comment/${currentCommentId}`, data)
    .then((result) => {
      updateComments();
      onClose();
    })
    .catch((error) => {
      alert('error');
      console.log(error);
    })
  }

  if (!isOpen) return null;

  return (
    <div className="bg-gray-500 bg-opacity-75 fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto text-5xl text-yellow-400 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {<MdOutlineEdit />}
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Sửa bình luận</h3>
                <div className="mt-4">
                  <textarea
                    id="details"
                    name="details"
                    rows="3"
                    className="mt-1 w-96 focus:ring-red-500 focus:border-red-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập nội dung..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => EditComment()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sửa bình luận
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Huỷ bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
