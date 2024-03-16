import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowCircleRight, FaStar } from 'react-icons/fa';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_GOOGLE_BOOKS_API}/${id}?key=${import.meta.env.VITE_API_KEY}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setProduct(data);
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Error fetching data', error);
    //         }
    //     };
    //     fetchData();
    //     window.scrollTo({top:0, behavior: 'smooth'});
    // }, [id]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const description = isExpanded ? product?.volumeInfo?.description : `${product?.volumeInfo?.description?.slice(0, 200)}...`;

    return (
        <div className="mt-40 max-w-screen-2xl container mx-auto xl:px-28 px-4">
            <div className="p-3 max-w-7xl m-auto">
                {/* Navigate */}
                <div className="mt-6">
                    <a href="/" className="text-gray-600">Home</a>
                    <a href={`/shop/${product?.id}`} className="text-gray-600"> /Shop</a>
                    <a href={`/shop/${product?.id}`} className="font-bold text-black"> /{product?.volumeInfo.title}</a>
                </div>
                <hr />
                <div className="mt-6 sm:mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-6 h-max">
                        {/* Images */}
                        <div>
                            <img
                                src={product?.volumeInfo.imageLinks ? product?.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=0') : './alter/book_alter.png'}
                                alt={product?.volumeInfo.title}
                                className="mx-auto w-full  hover:scale-105 trasition-all duration-300"
                            />
                        </div>
                        {/* Details */}
                        <div>
                            {/* Title-subtile */}
                            <h1 className="title text-left">{product?.volumeInfo.title} - {product?.volumeInfo.subtitle}</h1>
                            {/* Decriptions text */}
                            <div
                                dangerouslySetInnerHTML={{ __html: description }}
                                className="mt-3 text-gray-600 text-base leading-6 text-justify sm:text-left sm:mt-4"
                            />
                            {product?.volumeInfo?.description?.length > 200 && (
                                <button className="text-blue-500 underline" onClick={toggleDescription}>
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                            {/* Additional Information */}
                            <div className="mt-4">
                                <p>
                                    <strong>Authors:</strong> {product?.volumeInfo.authors?.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Publisher:</strong> {product?.volumeInfo.publisher || 'N/A'}
                                </p>
                                <p>
                                    <strong>Published Date:</strong> {product?.volumeInfo.publishedDate || 'N/A'}
                                </p>
                                <p>
                                    <strong>Page Count:</strong> {product?.volumeInfo.pageCount || 'N/A'}
                                </p>
                                <p>
                                    <strong>Language:</strong> {product?.volumeInfo.language || 'N/A'}
                                </p>
                            </div>
                            {/* Rating */}
                            <span className="my-2 text-xl text-yellow-400 flex item-center gap-1 sm:my-4">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </span>
                            {/* Prices */}
                            <p title="price" className="text-red-500 font-semibold sm:text-2xl pr-8 ">
                                <strong>{product?.saleInfo.listPrice ? product?.saleInfo.listPrice.amount : 'Sold out'}</strong>
                                <span className="text-sm text-orange-600"> {product?.saleInfo.listPrice ? product?.saleInfo.listPrice.currencyCode : null}</span>
                            </p>
                            {/* Order Space */}
                            <div>
                                <div className="text-left flex flex-col gap-2 w-full">
                                    <label htmlFor="quantity" className="font-semibold">Quantity</label>
                                    <input type="number" name="price" id="price" defaultValue={1} required 
                                    className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full 
                                    outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 focus:border-red-500"/>
                                </div>
                                <div className="w-full text-left my-4">
                                    <button className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500
                                    text-white font-bold border border-red-500 rounded-md ease-in-out duration-150
                                    shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6">
                                        <span>Confirm Oder</span>
                                        <FaArrowCircleRight/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
