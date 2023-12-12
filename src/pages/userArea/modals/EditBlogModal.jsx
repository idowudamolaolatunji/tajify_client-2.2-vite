import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Textarea,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import CurrencyInput from "react-currency-input-field";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
// import { useAuthContext } from "../../context/AuthContext";
import { useAuthContext } from "../../../context/AuthContext";

import { useDataContext } from "../../../context/DataContext";
import { HOST_URL } from "../../../assets/js/help_func";

const ADD_PRODUCT_URL = `${import.meta.env.VITE_SERVER_URL}/market`;

const EditBlogModal = ({ isOpen, onClose, user, singleProduct, myProductsId }) => {




  const { token } = useAuthContext();

  const [image, setImage] = useState(); // Cloudinary image URL
  const [name, setName] = useState();
  // const [price, setPrice] = useState(singleProduct);
  const [price, setPrice] = useState();
  const [slashed_price, setSlashedPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [productType, setProductType] = useState();
  const [brand, setBrand] = useState();
  const [youtube, setYoutube] = useState();
  const [quantity, setQuantity] = useState();
  const [specs, setSpecs] = useState();
  const [size, setSize] = useState();
  const [loading, setLoading] = useState(false);


  console.log(myProductsId)
  console.log(price)
  console.log(singleProduct?.message.price)
  console.log(singleProduct)

  // Function to handle product update
  const handleEdit = async () => {
    try {
      setLoading(true);
      const result = await fetch(`${HOST_URL()}/market/${myProductsId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result) {
        toast.success("Product updated successfully!");
        history.push(`/v-products/${id}`);
        // history.push(`/products/${productId}`);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(singleProduct?.message.name)
    setPrice(singleProduct?.message.price);
    setSlashedPrice(singleProduct?.message.slashed_price);
    setCategory(singleProduct?.message.category);
    setDescription(singleProduct?.message.description);
    setProductType(singleProduct?.message.productType)
    setBrand(singleProduct?.message.brand);
    setYoutube(singleProduct?.message.youtubeLink);
    setQuantity(singleProduct?.message.quantity)
    setSpecs(singleProduct?.message.specs)
    setSize(singleProduct?.message.size);
    }, [singleProduct]);
  // }, []);



  // FUNCTION TO UPLOAD IMAGE TO CLOUDINARY
  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        // `${import.meta.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
        "ml_default"
      ); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlvm6us0n/image/upload",
        formData
      );

      if (response.status === 200) {
        // Image uploaded successfully
        const imageUrl = response.data.secure_url;
        setImage(imageUrl);
      } else {
        console.error("Image upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // FUNCTION TO HANDLE CHANGES WHILE TYPING
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent style={{ minHeight: "70vh" }}>
        <ModalHeader>
          <h1 className="text-2xl text-green-600">Edit A Product</h1>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="m-5">
            <FormControl id="username">
              <FormLabel style={{ fontSize: "1.3rem" }}>Name</FormLabel>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="bio">
              <FormLabel style={{ fontSize: "1.3rem" }}>Description</FormLabel>
              <Textarea
                name="description"
                className="text-lg"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                borderBottom="1px solid #CBD5E0" // Customize border bottom
              // You can customize other textarea styles as needed
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="bio">
              <FormLabel style={{ fontSize: "1.3rem" }}>
                Product Specifications
              </FormLabel>
              <Textarea
                name="specs"
                className="text-lg"
                placeholder="Product specification"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                borderBottom="1px solid #CBD5E0" // Customize border bottom
              // You can customize other textarea styles as needed
              />
            </FormControl>
          </div>
          {/* <div className="flex justify-center mt-8 mb-8"> */}
          <div className="m-5">
            <div className="rounded-lg bg-gray-50 w-full">
              <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">
                  Upload Image(jpg, png, svg, jpeg, Not more than 1mb)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        {image ? "Change photo" : "Select a photo"}
                      </p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      // value={singleProduct?.message.image}
                      onChange={handleImage}
                      className="opacity-0"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="m-5">
            <FormControl id="email">
              <FormLabel style={{ fontSize: "1.3rem" }}> Quantity</FormLabel>
              <input
                type="text"
                name="quantity"
                value={quantity}
                placeholder="0"
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="email">
              <FormLabel style={{ fontSize: "1.3rem" }}> Price</FormLabel>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₦0"
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="email">
              <FormLabel style={{ fontSize: "1.3rem" }}>
                {" "}
                Slashed Price
              </FormLabel>
              <input
                type="text"
                name="slashed_price"
                value={slashed_price}
                onChange={(e) => setSlashedPrice(e.target.value)}
                placeholder="₦0"
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          <div className="m-5">
            <FormControl id="category">
              <FormLabel style={{ fontSize: "1.3rem" }}>Product Type</FormLabel>
              <select
                name="productType"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                <option value="select-product">Select Product Type</option>
                <option value="digital">Digital Product</option>
                <option value="physical">Physical Product</option>
              </select>
            </FormControl>

            <FormControl id="category">
              <FormLabel style={{ fontSize: "1.3rem" }}>Product Size</FormLabel>
              <select
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                <option value="">Select Product Size</option>
                <option value="xl">Extra Large (XL)</option>
                <option value="l">Large (L)</option>
                <option value="md">Medium (MD)</option>
                <option value="s">Small (S)</option>
                <option value="xs">Extra Small (XS)</option>
                <option value="xxl">Double Extra Large (XXL)</option>
                <option value="3xl">Triple Extra Large (3XL)</option>
                <option value="4xl">Quadruple Extra Large (4XL)</option>
                <option value="5xl">Quintuple Extra Large (5XL)</option>
              </select>
            </FormControl>
            <FormControl id="category">
              <FormLabel style={{ fontSize: "1.3rem" }}>Category</FormLabel>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                <option value="category-select">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="men fashion">Men's fashion</option>
                <option value="women fashion">Women's fashion</option>
                <option value="ebooks/magazines">ebooks/magazines</option>
                <option value="online courses">Online courses</option>
                <option value="phones">Phones</option>
                <option value="accessories">Accessories</option>
                <option value="fashion">Fashion</option>
                <option value="computer">Computer</option>
                <option value="arts and graphics">Arts and graphics</option>
                <option value="technology">Technology</option>
              </select>
            </FormControl>
            <FormControl id="category">
              <FormLabel style={{ fontSize: "1.3rem" }}>Select Brand</FormLabel>
              <select
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                <option value="xiaomi">Xiaomi</option>
                <option value="samsung">Samsung</option>
                <option value="asus">Asus</option>
                <option value="fashion">fashion</option>
                <option value="hisense">Hisense</option>
                <option value="oraimo">Oraimo</option>
                <option value="infinix">Infinix</option>
                <option value="generic">Generic</option>
                <option value="apple">Apple</option>
                <option value="dell">Dell</option>
                <option value="hp">HP</option>
                <option value="sony">Sony</option>
                <option value="lg">LG</option>
                <option value="huawei">Huawei</option>
                {/* Add more options as needed */}
              </select>
            </FormControl>
          </div>

          <div className="m-5">
            <FormControl id="interest">
              <FormLabel style={{ fontSize: "1.3rem" }}>
                Youtube link (Optional)
              </FormLabel>
              <input
                type="text"
                name="youtubeLink"
                placeholder="https://www.youtube.com/watch?v=MLWxgIuciGI"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="bg-gray-50 p-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </FormControl>
          </div>
          {/* Add more fields for other profile information */}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-between w-[252px]">
            <Button
              onClick={onClose} // Close the modal when "Cancel" is clicked
              colorScheme="red"
              className=" py-4 px-8 bg-[#FF0066] rounded-lg font-semibold text-white text-lg flex items-center gap-2"
            >
              Cancel
            </Button>
            <Button
              // onClick={handleEdit(myProductsId)}
              onClick={() => handleEdit(myProductsId)}
              colorScheme="green"
              className="py-4 px-8 bg-green-600 rounded-lg font-semibold text-lg text-white flex items-center gap-2"
            >
              Save Changes
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditBlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

export default EditBlogModal;
