import React from 'react';

const Like = ({ onClick, isLiked }) => {
  const className = isLiked ? "fas" : "far";
  return <i className={className + " fa-heart"} onClick={onClick} style={{cursor:"pointer"}}></i>;
};

export default Like;
