import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolTip from "./ToolTip";

const Item = ({ items, term, token }) => { 
    const [ids, setIds] = useState([]);
    const [media, setMedia] = useState([]);


    const filteredItems = items.filter(item => item.data.name.en_US.toLowerCase().includes(term.toLowerCase()));

    const getMedia = async () => {
        let arr = [];
        if (ids.length <= 1) {
          await axios
            .get(
              `https://us.api.blizzard.com/data/wow/media/item/${ids[0]}?namespace=static-classic-us&locale=en_US&access_token=${token}
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
          for (let i = 0; i < ids.length - 1; i++) {
            await axios
              .get(
                `https://us.api.blizzard.com/data/wow/media/item/${ids[i]}?namespace=static-classic-us&locale=en_US&access_token=${token}
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

    useEffect(() => {
        setIds(filteredItems.map(item => item.data.media.id));
    }, [items, term])

    useEffect(() => {
        getMedia();
    }, [ids])
    console.log(media, "media")
    const mergedArray = filteredItems.map((item, i) => {
        return Object.assign({}, item, media[i]);
      });
    console.log(mergedArray, "mergedArray" );
      const renderNamesOfItems = () => {
        if (mergedArray.length > 0) {
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
      }

    return (
        <div>
            {ids}
            {renderNamesOfItems()}
            <ToolTip />
        </div>
    )
}

export default Item;