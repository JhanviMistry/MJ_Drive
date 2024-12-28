import {useState} from "react";
import "./Display.css"
const Display = ({contract, account}) => {
    const [data, setData] = useState("");
    const getData = async () => {
        let dataArray;
        const otherAddress = document.querySelector(".address").value; //in input tab with address classname whatever value is entered will be used
        try{
            if(otherAddress){
                dataArray = await contract.display(otherAddress);
                console.log(dataArray);
            }else{
                dataArray = await contract.display(account);
            }
        } catch(e){
            alert("You don't have access!");
        }
        
        //if dataArraybis empty, means no images uploaded then no point of fetching
        const isEmpty = Object.keys(dataArray).length===0;

        if(!isEmpty){
            const str = dataArray.toString(); //the data is in string format, convert it to string
            const str_array = str.split(",");
            //console.log(str);
            //console.log(str_array);

            //dataArray is the links of the images, now mapping is used to display the images
            const image = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                        alt="new"
                        className="image-list"></img>
                    </a>
                );
            }); 
            setData(image);
        }else{
            alert("No image to display");
        }    
    };
    return (<>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter address"className="address" />
        <button className="center button" onClick={getData}>Get Data</button>
    </>
    );
};
export default Display;
