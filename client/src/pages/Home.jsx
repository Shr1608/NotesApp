import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { axiosRequest } from "../axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const username = JSON.parse(localStorage.getItem("name"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchNotes() {
      const res = await axiosRequest.get("/notes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res?.data);
      console.log(res);
    }
    fetchNotes();
  }, []);

  const [noteData, setNoteData] = useState({
    title: "",
    desc: "",
    content: "",
  });

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteData.title !== "" && noteData.desc !== "" && noteData.content) {
        await axiosRequest.post("/notes/", noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosRequest.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex relative flex-col max-w-screen min-h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1611079830811-865ff4428d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1834&q=80')] bg-no-repeat bg-center bg-blend-overlay">
      <Modal showModal={showModal} setShowModal={setShowModal} noteId={selectedNote} />
      <div className="overlay z-10"></div>
      <Navbar type="home" />

      <div className="flex flex-col lg:flex-row items-start justify-between px-5 lg:px-10 py-2 w-full text-gray-200 z-50">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <h1 className="font-semibold text-4xl mb-1">
            Hi {username}, Here are your Notes
          </h1>
          <div className="flex items-center flex-col gap-2 w-full">
            {notes.map((note) => (
              <div class="block w-full p-6 border border-gray-200 rounded-lg shadow bg-black bg-opacity-60 hover:bg-opacity-70">
                <a href={`/note/${note._id}`}>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {note.title}
                  </h5>
                  <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
                    {note.desc}
                  </p>
                </a>
                <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
                  <span className="text-sm">
                    {format(new Date(note.createdAt), "d MMM yyyy - hh:mm a")}
                  </span>
                  <div className="flex items-center gap-4">
                    <FaRegEdit
                      size={23}
                      color="yellow"
                      onClick={() => {
                        setSelectedNote(note._id);
                        setShowModal(true);
                      }}
                    />
                    <MdDelete
                      onClick={() => handleDelete(note._id)}
                      size={25}
                      color="red"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-black bg-opacity-50 rounded-xl text-black w-full lg:w-2/5 mt-12">
          <div className="mx-auto max-w-lg text-start">
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              Create a Note
            </h1>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Title"
                  value={noteData.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  name="desc"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Description"
                  value={noteData.desc}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <textarea
                  name="content"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Content"
                  value={noteData.content}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded-lg bg-[#ffaa00] px-5 py-2 text-sm font-medium text-black hover:bg-[#ffb700] transition-all duration-100"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
