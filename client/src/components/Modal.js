import {useEffect} from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
      const address = document.querySelector(".address").value;
      await contract.allow(address);
    };
    useEffect(() => {
        const accessList = () => {
            const addressList = contract.shareAccess();
            const select = document.querySelector("#selectNumber");
            const options = addressList;

            for(let i=0; i<options.length; i++){
                let opt = options[i];
                let e1 = document.createElement("option");
                e1.textContent=opt;
                e1.value=opt;
                select.appendChild(e1);
            }
        };
        contract && accessList(); //useEffect will be performed only after these 2 things are present 
    }, []);
    return ( <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Share with</div>
            <div className="body">
                <input type="text" className="address" placeholder="Enter the address"></input>        
            </div>
            <form id="myform">
                <select id="selectNumber">
                    <option className="address">People with access</option>
                </select>
            </form>
            <div className="footer">
                <button onClick={()=>{setModalOpen(false)}} id="cancelBtn">Cancel</button>
                <button onClick={()=>sharing()}>Share</button>
            </div>
        </div>
    </div>
        </> );

};
export default Modal;
