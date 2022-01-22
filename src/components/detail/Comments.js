import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLoginStore } from "../global/User";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../login/Firebase";
import "./comment.css";
const Comments = () => {
    const id = useParams()
    const user = useLoginStore(state => state.user)
    const [value,setValue] = useState('')


    const handleComment = (e) => {
        setValue(e.target.value)
    }
  return (
    <div className="comments">
      <h2>Comments</h2>
      <form>
        <div className="input-user">
          <img></img>
          <input value={value} onChange={(e) => handleComment(e)}  placeholder="Comments somethings...."></input>
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
