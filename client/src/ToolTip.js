import React, { useState } from "react";

const ToolTip = (props) => {
    const [media, setMedia] = useState([]);


    const getMedia = async (id) => {
        console.log(id, "id")
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

    return (
        <div className="toolTip">
            <h5>{props.name}</h5>

        </div>
    )
}

export default ToolTip;