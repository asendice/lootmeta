import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const App = () => {
  const [items, setItems] = useState([]);
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
    await axios
      .get(
        `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${term}&orderby=field1&_pageSize=1000&_maxPageSize=1000&access_token=${token}`
      )
      .then((res) => {
        setIds(res.data.results)
      })
      .catch((err) => {
        console.error(err);
      });
  };


 const setIds = (itms) => {
  const filteredItems = itms.flat().filter((item) => {
    if(term.length > 0){
      return item.data.name.en_US
      .toLowerCase()
      .includes(term.toLowerCase());
    }
  });
  const idsArr = filteredItems.map((item) => {
    return item.data.media.id;
  });
  setItems(idsArr);
 }

  const onSubmit = (() => {
    getItems();
    
  })


  // const mergedArray = filteredItems.map((item, i) => {
  //   return Object.assign({}, item, media[i]);
  // });
  // console.log(mergedArray, "mergedArray")

  // const renderNamesOfItems = () => {
  //   if (mergedArray.length > 0) {
  //     return mergedArray.map((item) => {
  //       return (
  //         <div key={item.data.id}>
  //           <div style={{ border: "solid black 1px" }}>
  //             <img src={item.image} />
  //             <div>{item.data.name.en_US}</div>
  //             <div>{item.data.quality.type}</div>
  //             <div>{item.data.item_subclass.name.en_US}</div>
  //             <div>{item.data.id}</div>
  //           </div>
  //         </div>
  //       );
  //     });
  //   } else {
  //     <div>No results</div>;
  //   }
  // };

  return (
    <div>
      <SearchBar term={term} setTerm={setTerm} onSubmit={onSubmit} />
      {/* {renderNamesOfItems()} */}
    </div>
  );
};

export default App;
