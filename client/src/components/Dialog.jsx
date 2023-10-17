import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({ o: open, handleOpen }) {
  const [open, setOpen] = useState(o);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit your Note</DialogHeader>
        <DialogBody divider>
          {/* <form
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
          </form> */}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Edit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
