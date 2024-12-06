import Form from "react-bootstrap/Form";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const MySearch = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/details/${input}`);
        }}
        className="pb-5"
      >
        <Form.Label className="text-white fs-3">Find a City</Form.Label>
        <div className="d-flex justify-content-center align-items-center pt-2">
          <Form.Control
            placeholder="Write here the city that're you searching for..."
            value={input}
            id="custom-input"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
      </Form>
    </>
  );
};

export default MySearch;
