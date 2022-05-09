import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && file) {
      let data = new FormData();
      data.append("name", name);
      data.append("img", file);
      let options = {
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "https://k-share.herokuapp.com/api/upload",
        data: data,
      };
      axios(options)
        .then((res) => setFlag(res.data.success))
        .catch((err) => console.log(err));
    } else {
      console.log("something went wrong");
    }
  };
  const handleReset = () => {
    setFlag(false);
    setFile(null);
  };
  return (
    <div className="App">
      <div className="logo">
        <img src={require("./logo.png")} alt="logo" />
        <h3 className="tag_line">Share your file</h3>
      </div>
      {!flag && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Attach your file</label>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="Submit">
              {" "}
              Submit
            </button>
          </form>
        </div>
      )}
      {flag && (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#ffff" }}>Successfully uploaded </h1>
          <button onClick={handleReset} className="Submit">
            Upload More Files
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
