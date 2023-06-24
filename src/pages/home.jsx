import React, { useContext } from "react";
import "../App.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import  { Update } from "../context";
export default function Home() {
  const navigate = useNavigate();
  const { handleVote, bookmarkHandler, latestHandler, postdata } =
    useContext(Update);
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
                          handleVote(post.upvotes, post.postId, true);
                        }}
                        className="uparrow"
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                    <p>{post.upvotes}</p>
                    <p>
                      <BiSolidDownArrow
                        onClick={() => {
                          handleVote(post.upvotes, post.postId, false);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                  </div>
                  <div>
                    <li>
                      <div>
                        postedBy@
                        <span className="username">{post.username}</span>
                        {post.createdAt}
                      </div>
                      <h3>{post.post}</h3>
                      {post.tags.map((tag) => (
                        <span className="hash-tags">#{tag}</span>
                      ))}
                      <div>{post.postDescription}</div>
                    </li>
                  </div>
                </div>
                <div>
                  <hr />
                  <BiCommentDetail
                    className="post-components"
                    onClick={() => navigate(`/post/${post.postId}`)}
                  />
                  <FiShare2 className="post-components" />
                  {post.isBookmarked ? (
                    <BsBookmarkFill
                      className="post-components"
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
        <div onClick={() => latestHandler()}>
          Latest Post <BiSolidDownArrow />
        </div>
      </div>
    </div>
  );
}
