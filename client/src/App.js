import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [token, setToken] = useState("");
  const [media, setMedia] = useState([]);

  console.log(token, "token")

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

  

  // getting item images
  const getMedia = async (id) => {
    let arr = [];
    if (id.length <= 1) {
      await axios
        .get(
          `https://us.api.blizzard.com/data/wow/media/item/${id[0]}?namespace=static-classic-us&locale=en_US&access_token=${token}
        `
        )
        .then((res) => {
          let obj = {
            image: res.data.assets[0].value,
            id: res.data.id,
          };
          arr.push(obj);
          setMedia(arr);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      for (let i = 0; i < id.length - 1; i++) {
        await axios
          .get(
            `https://us.api.blizzard.com/data/wow/media/item/${id[i]}?namespace=static-classic-us&locale=en_US&access_token=${token}
            `
          )
          .then((res) => {
            let obj = {
              image: res.data.assets[0].value,
              id: res.data.id,
            };
            arr.push(obj);
            setMedia(arr);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };
 

  // get all of the wow items based on search term
  const getItems = async () => {
    await axios
      .get(
        `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=${submittedTerm}&orderby=field1&_pageSize=1000&_maxPageSize=1000&access_token=${token}`
      )
      .then((res) => {
        const filteredItems = res.data.results.flat().filter((item) => {
          if(submittedTerm.length > 0){
            return item.data.name.en_US
            .toLowerCase()
            .includes(submittedTerm.toLowerCase());
          }
         
        });
        console.log(filteredItems, "filteredItems")
        setItems(filteredItems)
        const idsArr = filteredItems.map((item) => {
          console.log(item, "item in map func");
          return item.data.media.id;
        });
        console.log(idsArr, "idsArr")
        getMedia(idsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(submittedTerm, "submittedTerm")

  console.log(media, "media");

  const mergedArray = items.map((item, i) => {
      return Object.assign({}, item, media[i]);
  });

  console.log(mergedArray, "mergedArray")

  const submitSearch = () => {
    getItems();
    setSubmittedTerm(term);
  };


  // if (filteredItems.length > 0) {
  //   const idsArr = filteredItems.map((item) => {
  //     console.log(item, "item in map func");
  //     return item.data.media.id;
  //   });
  //   getMedia(idsArr);
  // }

  const renderNamesOfItems = () => {
    if (media.length > 0) {
      return mergedArray.map((item) => {
        return (
          <div key={item.data.id}>
            <div style={{ border: "solid black 1px" }}>
              <img src={item.image} />
              <div>{item.data.name.en_US}</div>
              <div>{item.data.quality.type}</div>
              <div>{item.data.item_subclass.name.en_US}</div>
              <div>{item.data.id}</div>
            </div>
          </div>
        );
      });
    } else {
      <div>No results</div>;
    }
  };

  return (
    <div>
      <input onChange={(e) => setTerm(e.target.value)} />
      <button onClick={() => submitSearch()}>SUBMIT</button>
      {renderNamesOfItems()}
    </div>
  );
};

export default App;
