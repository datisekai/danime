import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoginStore } from "../global/User";
import {
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../login/Firebase";
import { collection, addDoc } from "firebase/firestore";
import "./comment.css";
import { async } from "@firebase/util";
const Comments = () => {
  const id = useParams();
  const user = useLoginStore((state) => state.user);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(getComments());
  }, []);

  const getComments = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const userComments = {
      uid: user.uid,
      img: user.photoURL,
      name: user.displayName,
    };
    const data = { user: userComments, idAnime: id.id, comments: value };
    try {
      const docRef = addDoc(collection(db, "comments"), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleComment = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="comments">
      <h2>Comments</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-user">
          <img></img>
          <input
            value={value}
            onChange={(e) => handleComment(e)}
            placeholder="Comments somethings...."
          ></input>
          <button>Send</button>
        </div>
      </form>

      <div className="show-comments">
        <div className="comment-list">
          <div className="comment-item">
            <img></img>
            <div className="comment-info">
              <h2>abc</h2>
              <p>ac</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
