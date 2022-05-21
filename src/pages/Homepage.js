import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f9170000100000183dad702e6694337bd182fd9f3d21e9a ";
  const intialURL = " https://api.pexels.com/v1/curated?page=1&per_page=16";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=1`;

  //fetch data from pexels api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  //load More picture
  const morepicture = async () => {
    let newURL;
    if (input == "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  };

  //fetch data when the fetch load up

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
