import { useState, useEffect } from "react";
import axios from "axios";
import Cart from "@/components/Cart";
import Product from "@/components/Product";
import ReactPaginate from "react-paginate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const productsPerPage = 12;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => <Product key={product.id} product={product} />);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Navbar />
      <div class="grid grid-cols-6">
        <div className="col-start-1 col-end-6 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayProducts}
          </div>
          <div className="mt-8">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              activeClassName={"item active"}
              breakClassName={"item break-me"}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              marginPagesDisplayed={2}
              nextClassName={"item next"}
              pageClassName={"item pagination-page"}
              previousClassName={"item previous"}
            />
          </div>
        </div>
        <div className="py-6 px-3">
          <Cart />
        </div>
      </div>
      <Footer />
    </>
  );
}
