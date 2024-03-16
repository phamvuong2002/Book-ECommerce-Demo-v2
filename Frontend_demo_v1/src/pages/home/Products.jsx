import React, { useEffect, useState, useRef } from 'react'
import { FaFilter, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import Card from '../../components/Card'



const Products = () => {
  const tagRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0)
  const [products, setProducts] = useState([])
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(0);
  const orderBy = ('newest') // newest
  const queries = ('subject:fiction');
  const [filter, setFilter] = useState('partial');
  const queryParams = `q=${queries}&orderBy=${orderBy}&maxResults=${itemsPerPage}&startIndex=${startIndex}&filter=${filter}`;
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/api/v1/api/recommendation/popular';
        // const response = await fetch(`${import.meta.env.VITE_GOOGLE_BOOKS_API}?${queryParams}&key=${import.meta.env.VITE_API_KEY}`);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_X_API_VERSION_KEY,
          },
          credentials: 'include',
          // body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();


        // Sort the items array based on the price
        // const sortedItems = data.items.sort((a, b) => {
        //   const priceA = a.saleInfo && a.saleInfo.listPrice && a.saleInfo.listPrice.amount || 0;
        //   const priceB = b.saleInfo && b.saleInfo.listPrice && b.saleInfo.listPrice.amount || 0;

        //   if (sortOrder === 'low-to-high') {
        //     return priceA - priceB;
        //   } else if (sortOrder === 'high-to-low') {
        //     return priceB - priceA;
        //   } else if (sortOrder === 'A-Z') {
        //     return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
        //   } else if (sortOrder === 'Z-A') {
        //     return b.volumeInfo.title.localeCompare(a.volumeInfo.title);
        //   }

        //   // Default sorting or no sorting
        //   return 0;
        // });

        setProducts(data.metadata); //sortedItems ||
        setTotalPages(Math.ceil(data.metadata.length / itemsPerPage)); // You may uncomment this if needed
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [startIndex, filter, sortOrder]);


  const filterBook = (value) => {
    // Call setupQueryParams whenever relevant state values change
    const setupQueryParams = () => {
      setFilter(value);
      setStartIndex(0);
    };

    setupQueryParams();
  };

  const handleNextPage = () => {
    if (startIndex + itemsPerPage < totalPages * itemsPerPage) {
      setStartIndex(startIndex + itemsPerPage);
      tagRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
      tagRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setStartIndex(0);
  };

  return (
    <div ref={tagRef} className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="title">Or subscribe to newsletters</h2>

      {/* Product cards*/}
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-x-3 mb-8">

        {/* all buttons */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          <button onClick={() => { filterBook('full') }}>All Books</button>
          <button onClick={() => { filterBook('paid-ebooks') }}>Populars</button>
          <button onClick={() => { filterBook('free-ebooks') }}>Free Books</button>
          <button onClick={() => { filterBook('ebooks') }}>EBooks</button>
        </div>

        {/* sorting option */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <FaFilter className="text-white h-4 w-4" />
          </div>
          <select name="sorting" id="sort" className="bg-black text-white px-2 py-1 rounded-sm" onChange={(e) => handleSortChange(e.target.value)}>
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

      </div>

      {/*  Show Products */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm" >
        {
          // eslint-disable-next-line react/prop-types
          products.map((item) => (
            <Card key={item.ItemID} item={item} />
          ))
        }
      </div>


      {/* Pagination buttons */}
      <div className="text-black flex justify-between mt-5 font-semibold">
        <button onClick={handlePrevPage} className="bg-black hover:bg-orange-500 px-6 py-2 text-white font-semibold rounded-sm flex justify-center items-center gap-2">
          <FaArrowLeft />
          Previous
        </button>
        <span>{`Page ${Math.ceil((startIndex + 1) / itemsPerPage)} of ${totalPages}`}</span>
        <button onClick={handleNextPage} className="bg-black hover:bg-orange-500 px-6 py-2 text-white font-semibold rounded-sm flex justify-center items-center gap-2">
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Products