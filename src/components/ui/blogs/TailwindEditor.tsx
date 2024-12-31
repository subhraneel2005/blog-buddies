"use client";

import {Editor} from "novel"
import { useState } from "react";

const TailwindEditor = () => {
  const [content, setContent] = useState(null);
  return (
    <Editor/>
  );
};
export default TailwindEditor;
