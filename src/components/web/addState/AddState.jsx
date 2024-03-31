import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from '../addState/AddState.module.css'
import { UserContext } from "../context/User";

const AddState = () => {
    let { userToken } = useContext(UserContext);
    let [userId,setUserId]=useState("");

    const [address, setAddress] = useState("");
    const [typeEstates, setTypeEstates] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [typeEstateSR, setTypeEstateSR] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    
    useEffect(()=>{
    if(localStorage.getItem("userId"))
    {
        setUserId(localStorage.getItem("userId"));
    }
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("test");
        const formData = new FormData();
        formData.append("ownerId",userId);
        formData.append("address", address);
        formData.append("typeEstates",typeEstates);
        formData.append("bathrooms", parseInt(bathrooms));
        formData.append("bedrooms", parseInt(bedrooms));
        formData.append("price", parseInt(price));
        formData.append("area", parseInt(area));
        formData.append("typeEstateSR", typeEstateSR);
        formData.append("description",description);
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(data);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                token: userToken,
            },
        };
        try {
            const res = await axios.post(
                "https://estatetest.onrender.com/api/estate/create",
                formData,
                config,
            );
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const showBathroomsBedrooms = ["House", "Apartment", "Chalet",""].includes(typeEstates);

    return (
        <div className="container">
            <div className={`${style.AddState}`}>
            <p>Let's Make it Happen</p>
            <span>Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together.</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                <div className="col-md-3">
                    <div className="location">
                    <label className={`mb-2 ${style.label}`}>Location State:</label>
                    <select className="form-select w-75 border-4" value={address} onChange={(e) => setAddress(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                        <option value="state3">State 3</option>
                    </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="type">
                    <label className={`mb-2 ${style.label}`}>Type of State:</label>
                    <select className="form-select w-75 border-4" value={typeEstates} onChange={(e) => setTypeEstates(e.target.value)}>
                        <option value="">Property Type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Flat</option>
                        <option value="Land">Land</option>
                        <option value="Store">Store</option>
                        <option value="Chalet">Chalet</option>
                    </select>
                    </div>
                </div>
                {/* ززززززززززززززز */}

                {showBathroomsBedrooms&&(
                    <>
                    <div className="col-md-3">
                    <div className="Bathrooms">
                    <label className={`mb-2 ${style.label}`}>No. of Bathrooms:</label>
                    <select className="form-select w-75 border-4" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="">Select no. of Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="Bedrooms mb-3">
                    <label className={`mb-2 ${style.label}`}>No. of Bedrooms:</label>
                    <select className="form-select w-75 border-4" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                        <option value="">Select no. of Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </div>
                </div>
                    </>
                )}
                {/* ,,,,,,,,,,,,,,,,,,, */}
                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}>Price:</label>
                    <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="number" placeholder='Enter Price In Dollar' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <span className="input-group-text">.00</span>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="area">
                    <label className={`mb-2 ${style.label}`}>Area(m²):</label>
                    <input type="number" placeholder='Area in m²' className="form-control border-4" value={area} onChange={(e) => setArea(e.target.value)}/>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="renterORseller mt-4">
                    <label className={`mb-2 me-2 ${style.label}`}>Renter or Seller:</label>
                    
                    <input
                        type="radio"
                        name="renterOrSeller"
                        value="Rent"
                        className="form-check-input border-4 me-2"
                        checked={typeEstateSR === "Rent"}
                        onChange={(e) => setTypeEstateSR(e.target.value)}
                        
                    />
                    <label className={`me-2 ${style.label}`}>Renter</label>
                    <input
                        type="radio"
                        name="renterOrSeller"
                        value="Sale"
                        className="form-check-input border-4 me-2"
                        checked={typeEstateSR === "Sale"}
                        onChange={(e) => setTypeEstateSR(e.target.value)}
                    />
                    <label className={` me-2 ${style.label}`}>Seller</label>
                    </div>
                </div>

                <div className="detalis mb-2">
                <label className={`mb-2 ${style.label}`}>Details:</label>
                    <textarea
                        className="form-control border-4 w-25"
                        placeholder='Detalis on state'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className="images mb-4">
                <label className={`mb-2 ${style.label}`}>Images:</label>
                    <input
                        type="file"
                        multiple
                        className="form-control border-4 w-50"
                        onChange={(e) => setImages(e.target.files)}
                    />
                
                </div>
                
                </div>
                <button type="submit"  className={`${style.btn}`}>Submit</button>
                
            </form>
        </div>
    );
};

export default AddState;