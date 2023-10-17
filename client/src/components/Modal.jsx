import React, { useEffect, useState } from "react";
import { axiosRequest } from "../axios";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Modal = ({ showModal, setShowModal, noteId }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    desc: "",
    content: "",
  });
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchNotes() {
      const res = await axiosRequest.get(`/notes/${noteId}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote({
        title: res.data.title,
        desc: res.data.desc,
        content: res.data.content,
      });
    }
    fetchNotes();
  }, [showModal]);

  const handleChange = (e) => {
    e.preventDefault();
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    try {
      await axiosRequest.put(`/notes/${noteId}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center z-[9999] items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit your Note</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <MdClose size={25} />
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 flex  flex-col items-center shadow-md rounded px-8 pt-6 pb-8 w-full gap-4">
                    <div className="relative">
                      <label className="block ml-1 text-black text-sm font-semibold mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Title"
                        value={note.title}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="relative">
                      <label className="block ml-1 text-black text-sm font-semibold mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        name="desc"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Description"
                        value={note.desc}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="relative">
                      <label className="block ml-1 text-black text-sm font-semibold mb-1">
                        Content
                      </label>
                      <textarea
                        name="content"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Content"
                        value={note.content}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      handleEdit();
                      setShowModal(false);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
