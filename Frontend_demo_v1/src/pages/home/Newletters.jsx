import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Newletters = () => {
    const [products, setProducts] = useState([]);
    const queries = `The Bible`;
    const maxResults = 6;
    const queryParams = `q=${queries}&orderBy=newest&maxResults=${maxResults}&startIndex=10&filter=paid-ebooks`

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_GOOGLE_BOOKS_API}?${queryParams}&key=${import.meta.env.VITE_API_KEY}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setProducts(data.items);
    //         } catch (error) {
    //             console.error('Error fetching data', error);
    //         }
    //     }
    //     fetchData();
    // }, [])

    return (
        <div className="bg-[#1E2832] bg-opacity-5 x1:px-28 px-4 py-16">
            <h2 className="title mb-8">Follow products and discounts on Instagram</h2>
            {/* insta grid */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-20">
                {products.map((item)=>(
                    <Link key={item.id} to={`/shop/${item.id}`}>
                        <img src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=0') : './alter/book_alter.png'}
                            alt={item.volumeInfo.title}
                            className="h-64 mx-auto w-full hover:scale-105 trasition-all duration-300"
                        />
                    </Link>
                ))}
            </div>

            {/* newsletters */}
            <div>
                <h2 className="title mb-8">Or subscribe to the newsletter</h2>
                <form className="md:w-1/2 mx-auto text-center">
                    <input type="email" name="email" id="email" placeholder="Email address..."
                        className="h-8 bg-transparent outline-none border-b-2 pl-2 border-black md:w-2/3 w-full mb-5 Oplaceholder:text-black/50 mr-4" />
                </form>
            </div>
        </div >
    )
}

export default Newletters

