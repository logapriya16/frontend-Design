import React, { createContext, useState } from "react";
import { Data } from "../src/data";

export const Update = createContext();
export default function Context({children}) {
  const [postdata, setPostdata] = useState(Data.posts);
  const handleVote = (vote, id, operation) => {
    if (operation === true) {
      console.log(vote);
      const add = vote + 1;
      console.log(add);
      const temp = postdata.reduce(
        (acc, item) =>
          item.postId === id
            ? [...acc, { ...item, upvotes: add }]
            : [...acc, { ...item }],
        []
      );
      setPostdata(temp);
    }
    if (operation === false) {
      const sub = vote - 1;
      console.log("vote", vote - 1);
      console.log(sub);
      const temp = postdata.reduce(
        (acc, item) =>
          item.postId === id
            ? [...acc, { ...item, upvotes: sub }]
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
    setPostdata(temp);
  };
  const latestHandler = () => {
    const dates = postdata.map((item) => item.createdAt);
    console.log(dates);
    const temp = postdata.reduce(
      (acc, curr) =>
        curr.postId
          ? [...acc, { ...curr, createdAt: Date(curr.createdAt) }]
          : [...acc, { ...curr }],
      []
    );
    const sorted = temp.sort((a, b) => a.createdAt - b.createdAt);
    console.log(temp);
  };
  return (
    <Update.Provider value={{ handleVote, bookmarkHandler ,latestHandler,postdata,setPostdata}}>
      {children}
    </Update.Provider>
  );
}
