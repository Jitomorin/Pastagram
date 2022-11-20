import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NotificationLogo from "./logo components/notification_logo";
import HomeLogo from "./logo components/home_logo";
import SearchLogo from "./logo components/search_logo";
import ExploreLogo from "./logo components/explore_logo";
import MessagesLogo from "./logo components/messages_logo";
import CreateLogo from "./logo components/create_logo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddMediaLogo from "./logo components/add_media_logo";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { uploadMedia } from "../firebase/storage";
import { useAuthContext } from "../context/UserContext";
import { addPost } from "../firebase/firestore";
import ProfileLogo from "./logo components/profile_logo";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const AddPostDialog = (props) => {
  const [media, setMedia] = useState();
  const [caption, setCaption] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMedia(e.target.files[0]);
    if (media === undefined) {
      return;
    }
  };
  const postMedia = async () => {
    const uid = uuidv4();
    uploadMedia(uid, props.uid, media).then((url) => {
      addPost(
        props.currentUser.uid,
        url,
        caption,
        uid,
        props.currentUser.userName,
        props.currentUser.imageURL
      ).then(() => {
        setMedia(undefined);
        setCaption("");
        props.handleClose();
      });
    });
    router.push("/home");
  };

  return (
    <Dialog
      sx={{ borderRadius: 25 }}
      open={props.open}
      onClose={props.handleClose}
    >
      {media ? (
        <>
          <DialogTitle fontSize={16} sx={{ textAlign: "center" }}>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setMedia(undefined);
                }}
                className="justify-self-start"
              >
                <KeyboardBackspaceIcon />
              </button>
              <span className="font-semibold">Create new post</span>
              <button
                onClick={() => {
                  postMedia();
                }}
                className="text-actionBlue"
              >
                share
              </button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ height: "60vh", width: "100%" }} dividers>
            <div className="flex ">
              <div className="flex m-auto flex-col justify-center">
                <div className="w-full h-28 flex space-x-2 ">
                  <div className="w-1/2">
                    <Image
                      src={URL.createObjectURL(media)}
                      width={300}
                      height={300}
                      objectFit="contain"
                      alt=""
                    />
                  </div>

                  <div className="w-1/2 flex flex-col h-full ">
                    <div className="flex space-x-1">
                      <ProfileLogo
                        src={props.currentUser.imageURL}
                        width={24}
                        height={24}
                      />
                      <h2 className="font-semibold">
                        {props.currentUser.userName}
                      </h2>
                    </div>
                    <div className="mt-3">
                      <textarea
                        onChange={(e) => {
                          setCaption(e.target.value);
                        }}
                        className="w-full h-20 resize-none focus:outline-none"
                        placeholder="Write a caption..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            Create new post
          </DialogTitle>
          <DialogContent sx={{ height: "60vh", width: "100%" }} dividers>
            <div className="flex mx-10">
              <div className="flex m-auto space-y-4 flex-col justify-center">
                <AddMediaLogo className="justify-self-center" />
                <h2 className="text-xl text-gray-600">
                  Drag photos and videos here
                </h2>
                <label
                  htmlFor="upload_media"
                  className="bg-actionBlue text-md font-semibold text-white text-center p-1 mx-10 rounded-sm cursor-pointer"
                >
                  Select From Computer
                </label>
                <input
                  onChange={(e) => handleSubmit(e)}
                  className="hidden"
                  id="upload_media"
                  type="file"
                />
              </div>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

const SideBar = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuthContext();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col mr-3">
      <AddPostDialog
        open={open}
        currentUser={currentUser}
        handleClose={handleClose}
      />
      <h1 className="font-Cookie text-4xl font-semibold pl-4 pt-2">
        <Link href="/home">Pastagram</Link>
      </h1>
      <div className="flex flex-col justify-evenly w-full h-full">
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <HomeLogo />
            <span className="pl-2 font-semibold">Home</span>
          </div>
        </button>
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <SearchLogo />
            <span className="pl-2 font-semibold">Search</span>
          </div>
        </button>
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <ExploreLogo />
            <span className="pl-2 font-semibold">Explore</span>
          </div>
        </button>
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <MessagesLogo />
            <span className="pl-2 font-semibold">Messages</span>
          </div>
        </button>
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <NotificationLogo />
            <span className="pl-2 font-semibold">Notifications</span>
          </div>
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <CreateLogo />
            <span className="pl-2 font-semibold">Create</span>
          </div>
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <ProfileLogo width={24} height={24} src={currentUser.imageURL} />
            <span className="pl-2 font-semibold">Profile</span>
          </div>
        </button>
        <button
          className="p-4 mr-5 hover:bg-gray-50 rounded-r-full"
          background-color
        >
          <div className="flex space-x-1">
            {/* <Image src={NotificationLogo} alt=""></Image> */}
            <MoreHorizIcon />
            <span className="pl-2 font-semibold">More</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
