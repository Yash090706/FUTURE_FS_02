// src/components/searchbox.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FormControl } from "react-bootstrap";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Redirect to category page based on keyword
      navigate(`/category/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></FormControl>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
