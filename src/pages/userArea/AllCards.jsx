import React, { useEffect, useRef, useState } from "react";
// import { truncateString, calculateDiscount } from "../../utils/Helpers";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { HOST_URL } from "../../assets/js/help_func";
// import EditBlogModal from "./modals/EditBlogModal";

const MySwal = withReactContent(Swal);

const AllCards = ({ blog, myProductsId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [singleProduct, setSingleProduct] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //   Get the product id from the prop that was recieved
  // const id = myProductsId;



  // console.log(singleProduct?.message._id);
  // console.log(myProductsId);

  //   Function to delete a product
  const handleDelete = async () => {
    try {
      setLoading(true);

      // Display confirmation modal
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008001",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await fetch(
          `${HOST_URL()}/market/delete/${myProductsId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          toast.success("Product deleted successfully!!");
          console.log("Product deleted successfully!");
        } else {
          toast.error("Failed to create a product!");
          console.error("Failed to delete product:", response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SweetAlert modal
      MySwal.close();
      setLoading(false);
    }
  };

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getOneProduct();
  });
  // useEffect(() => {
  //   if (dataFetchedRef.current) return;
  //   dataFetchedRef.current = true;
  //   getOneProduct();
  // }, []);

  return (
    <>
      <div className="flex flex-col gap-[6px]">
        {/* <Link
          to={
            blogtype == "simple"
              ? `/products/${blogIdslug}`
              : `/v-products/${blogIdid}`
          }
        > */}
          <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] max-sm:w-[130px] bg-white rounded-[10px] my-2 transition-all hover:shadow-lg hover:-translate-y-1">
            <img
              src={blog.image}
              alt=""
              className="w-[130px] h-[130px] max-sm:w-[80px]  max-sm:h-[80px] object-cover"
            />
            <div className="product-txt-div flex flex-col gap-[6px]">
              <p className="text-sm max-sm:text-xs h-[40px]">
                {truncateString(blog.name, 25)}
              </p>
              <p className="font-bold text-base max-sm:text-sm">
                <Currency quantity={blog.price} currency="NGN" />
              </p>
              <p className=" text-xs line-through font-light">
                <Currency quantity={blog.slashed_price} currency="NGN" />
              </p>

              <p className=" text-green-600 text-sm max-sm:text-xs font-semibold">
                TAJI {nairaToTajiEquivalent(blog)}
              </p>
            </div>
            <div className="discount absolute w-[18px] h-[17px] top-[3px] right-[3px] bg-primary flex justify-center items-center rounded-full p-6 max-sm:p-4">
              <p className="text-white text-sm max-sm:text-xs">
                {calculateDiscount(
                  blogprice,
                  blogIdslashed_price
                )}
                %
              </p>
            </div>
          </div>
        {/* </Link> */}

        <div className="flex justify-between w-[157px]">
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className=" bg-[#FF0066] py-4 px-4 h-[30px] text-sm rounded-md font-semibold text-white flex items-center gap-2"
          >
            Edit
          </button>
          <button
            // onClick={() => handleDelete(blogId)}
            disabled={loading}
            className=" bg-[#008001] py-4 px-4 h-[30px] text-sm rounded-md font-semibold text-white flex items-center gap-2"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      {/* <EditBlogModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        singleProduct={singleProduct}
        myProductsId={myProductsId}
      /> */}
    </>
  );
};

export default AllCards;
