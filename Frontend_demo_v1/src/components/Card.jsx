import React from 'react'
import { Link } from 'react-router-dom'

const handleClickItem = (e) =>{
    // Lấy item.ItemID và sessionID 
    const ItemID =  e.target.getAttribute('data');
    const session = localStorage.getItem('session');
    console.log("behavior:", {
        sessionID: session,
        behavior: 'click',
        itemID: ItemID
    });
}

const Card = ({ item }) => {
    return (
        <div onClick={handleClickItem} >
            {/* <Link to={`/shop/${item.ItemID}`}> */}
                <img src={item.ImageURLM}
                    alt={item.BookTitle}
                    className="h-128 mx-auto w-full hover:scale-105 trasition-all duration-300"
                    data={item.ItemID}
                />
            {/* </Link> */}
            <div className="mt-4 px-4">
                <h4 className="text-base font-semibold">{item.BookTitle}</h4>
            </div>

            <div className=" flex justify-between">
                <p title="categories" className="text-black/50 pl-2">{item.BookAuthor}</p>
                <p title="price" className="font-semibold pr-8 text-orange-600">
                    <strong>{item.num_ratings}</strong>
                    <span className="text-sm"> {"USD"}</span>
                </p>

            </div>
        </div>
    )
}

export default Card