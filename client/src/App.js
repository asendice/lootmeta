import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Item from "./Item";

const App = () => {
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState([]);
  const [term, setTerm] = useState("");
  const [token, setToken] = useState("");
  

  console.log(items, "items")
  // get access token for blizzard oauth system
  const getAccessToken = async () => {
    await axios
      .get(
        "http://localhost:8000/api/getToken"
      )
      .then((res) => {
        setToken(res.data.result.access_token)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getAccessToken();
  }, []);

  // get all of the wow items based on search term
  const getItems = async () => {
    return await axios
      .get(
        `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${term}&orderby=field1&_pageSize=1000&_maxPageSize=1000&access_token=${token}`
      )
      .then((res) => {
        setItems(res.data.results.flat())
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getItems();
  }, [term])



  // console.log(mergedArray, "mergedArray")

  
  // };  console.log(ids, "ids")

  return (
    <div>
      <SearchBar term={term} setTerm={setTerm}  />
      <Item items={items} term={term} token={token}/>
    </div>
  );
};

export default App;
