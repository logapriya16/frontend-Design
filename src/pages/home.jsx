import React, { useState } from "react";
import { Data } from "../data";
import "../App.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [vote, setVote] = useState(0);
  const [postdata, setPostdata] = useState(Data.posts);
  const handleVote = (vote, id, operation) => {
    if ((operation = "add")) {
      const add = vote + 1;
      const temp = postdata.reduce(
        (acc, item) =>
          item.postId === id
            ? [...acc, { ...item, upvotes: add }]
            : [...acc, { ...item }],
        []
      );
      setPostdata(temp);
    }
    if (operation === "minus") {
      const add = vote - 1;
      const temp = postdata.reduce(
        (acc, item) =>
          item.postId === id
            ? [...acc, { ...item, upvotes: add }]
            : [...acc, { ...item }],
        []
      );
      setPostdata(temp);
    }
  };
  const bookmarkHandler = (Id) => {
    const temp = postdata.reduce(
      (acc, curr) =>
        curr.postId === Id
          ? [...acc, { ...curr, isBookmarked: !curr.isBookmarked }]
          : [...acc, { ...curr }],
      []
    );
    setPostdata(temp)
  };
  const latestHandler=()=>{
    const dates =postdata.map((item)=>item.createdAt)
    console.log(dates)
    const temp=postdata.reduce(
        (acc, curr) =>
          curr.postId 
            ? [...acc, { ...curr, createdAt: Date(curr.createdAt) }]
            : [...acc, { ...curr }],
        []
      );
      const sorted = temp.sort((a,b)=>a.createdAt-b.createdAt)
    console.log(temp) 
  }
  return (
    <div className="container">
      <div className="sidenav">
        <ul type="none">
          <li className="nav-links active">Home</li>
          <li className="nav-links">Explore</li>
          <li className="nav-links">Bookmark</li>
          <li className="nav-links">profile</li>
        </ul>
      </div>
      <div className="postarea">
        <h2>Latest Post</h2>
        <ul type="none" className="posts">
          {postdata.map((post) => {
            return (
              <div>
                <div className="post">
                  <div>
                    <p>
                      <BiSolidUpArrow
                        onClick={() => {
                          handleVote(post.upvotes, post.postId, "add");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                    <p>{post.upvotes}</p>
                    <p>
                      <BiSolidDownArrow
                        onClick={() => {
                          handleVote(post.upvotes, post.postId, "minus");
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                  </div>
                  <div>
                    <li>
                      <div>postedBy@{post.username}{post.createdAt}</div>
                      <h3>{post.post}</h3>
                      {post.tags.map((tag) => (
                        <span>#{tag}</span>
                      ))}
                      <div>{post.postDescription}</div>
                    </li>
                  </div>
                </div>
                <div>
                  <hr />
                  <BiCommentDetail className="post-components" 
                    onClick={() => navigate(`/post/${post.postId}`)} />
                  <FiShare2
                    className="post-components"
                  />
                  {post.isBookmarked ? (
                    <BsBookmarkFill className="post-components"
                    onClick={() => bookmarkHandler(post.postId)}
                    />
                  ) : (
                    <BsBookmark
                      className="post-components"
                      onClick={() => bookmarkHandler(post.postId)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="sorttype">
        <h3>Sort By</h3>
        <div onClick={()=>latestHandler()}>Latest Post <BiSolidDownArrow/></div>
      </div>
    </div>
  );
}
