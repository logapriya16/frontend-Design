import React from "react";
import { useParams } from "react-router-dom";
import { Data } from "../data";
import "../App.css";

import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import {FcLike} from "react-icons/fc"

export default function Post() {
  const { ID } = useParams();
  return (
    <div>
      <ul>
        {" "}
        {Data.posts
          .filter((item) => item.postId === ID)
          .map((post) => {
            return (
              <li type="none">
                <div>
                  <div className="post">
                    <div>
                      <p>
                        <BiSolidUpArrow />
                      </p>
                      <p>{post.upvotes}</p>
                      <p>
                        <BiSolidDownArrow />
                      </p>
                    </div>
                    <div>
                      <li>
                        <div>postedBy@{post.username}</div>
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
                    <BiCommentDetail className="post-components" />
                    <FiShare2 className="post-components" />
                    {post.isBookmarked ? (
                      <BsBookmarkFill className="post-components" />
                    ) : (
                      <BsBookmark className="post-components" />
                    )}
                  </div>
                  <div>
                    {post.comments.map((comm) => (
                      <div style={{textAlign:"left"}}>
                        <p>
                          <b>{comm.username}</b>@{comm.username}
                        </p>replying to  @
                        <p className="replying-to">{post.username}</p>
                        <p>{comm.comment}</p>
                        <hr />
                        <div>
                          <hr />
                          <BiCommentDetail className="post-components" />
                          <FiShare2 className="post-components" />
                          <FcLike
                          className="post-components"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
