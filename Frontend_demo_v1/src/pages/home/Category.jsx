import React from 'react'
import { Link } from 'react-router-dom'
const Category = () => {
  const BookBrandLogos = [
    {id:"1", title:"alpha-books", image:"/logobrands/alphabooks.png"},
    {id:"2", title:"thaha-books", image:"/logobrands/thaihabooks.png"},
    {id:"3", title:"kimdong-books", image:"/logobrands/kimdongbooks.png"},
    {id:"4", title:"mc-books", image:"/logobrands/mcbooks.png"},
    {id:"5", title:"mage-books", image:"/logobrands/magebooks.png"},
  ]

  return (
    <div className="max-w-screen-2xl mx-auto container xl:px-28 px-4 py-28">
      {/* Brand Logos */}
      <div className="flex justify-around items-center flex-wrap gap-5 py-5">
        {
          BookBrandLogos.map(({id, title, image}) => (
            <div key={id}><img src={image} alt={title} className="object-contain h-20 w-64"/></div>
          ))
        }
      </div>

      {/* Category grid */}
      <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
        <p className="font-semibold uppercase md:-rotate-90 text-center bg-black text-white md:p-1.5 p-2 rounded-sm inline-flex">
          Explore new and interesting books
        </p>
        <div>
          <Link to="/"><img src="/books/categories/book_1.png" alt="category-1" className="object-contain w-full hover:scale-105 transition-all duration-200"/></Link>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/"><img src="/books/categories/book_2.png" alt="category-2" className="object-contain w-full hover:scale-105 transition"/></Link>
            <Link to="/"><img src="/books/categories/book_3.png" alt="category-3" className="object-contain w-full hover:scale-105 transition"/></Link>
            <Link to="/"><img src="/books/categories/book_5.png" alt="category-5" className="object-contain w-full hover:scale-105 transition"/></Link>
            <Link to="/"><img src="/books/categories/book_4.png" alt="category-4" className="object-contain w-full hover:scale-105 transition"/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category