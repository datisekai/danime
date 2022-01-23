import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoginStore } from "../global/User";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../login/Firebase";
import { collection, addDoc } from "firebase/firestore";
import "./comment.css";
import { async } from "@firebase/util";
import swal from "sweetalert";
import Loading from "../loading/LoadingLogin";

const Comments = () => {
  const id = useParams();
  const user = useLoginStore((state) => state.user);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(false) 

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "comments"), where("idAnime", "==", id.id))
      );
      const listComments = [];
      querySnapshot.forEach((doc) => {
        listComments.push({ ...doc.data(), id: doc.id });
      });
      setComments(listComments);
    } catch {
      console.log("error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true)
    const userComments = {
      uid: user.uid,
      img: user.photoURL,
      name: user.displayName,
    };
    const data = { user: userComments, idAnime: id.id, comments: value };
    try {
      value.trim() != ""
        ? addDoc(collection(db, "comments"), data)
        : swal("Error", "You must to enter the content!", "error");
      getComments();
      setValue('')
      setLoad(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete your comment?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
       deleteDoc(doc(db, "comments", id));
        getComments()
        swal("Delete successfull", "", "success");
    };
  })
}

  const handleComment = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="comments">
      <h2 className="comments-title">Comments</h2>
      {user ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-user">
            <img src={user.photoURL}></img>
            <div>
              <input
                value={value}
                onChange={(e) => handleComment(e)}
                placeholder="Comments somethings...."
              ></input>
              {load ? <Loading/> : <button onClick={() => handleSubmit()}>Send</button>}
            </div>
          </div>
        </form>
      ) : (
        <div className="error-comment">
          You need to <Link to={`/login/${id.id}`}>login</Link> to comment{" "}
        </div>
      )}

      <div className="show-comments">
        <div className="comment-list">
          
          {comments.map((item, index) => (
            <div className="comment-item" key={index}>
              <img src={item.user.img}></img>
              <div className="comment-info">
                <h3>{item.user.name}</h3>
                <p>{item.comments}</p>
              </div>
              {user && item.user.uid === user.uid && (
                <i
                  className="delete-comment fas fa-times"
                  onClick={() => handleDelete(item.id)}
                ></i>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
