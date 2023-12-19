import { useState, useEffect } from "react";
import { Container, useDisclosure } from "@chakra-ui/react";
import Currency from "react-currency-formatter";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { HOST_URL } from "../../assets/js/help_func";
import BlogNavbar from "../../components/Navbar";
import Cookies from "js-cookie";

const MySwal = withReactContent(Swal);

const PaymentPage = () => {
  // Get the values of the cookies
  const singleBlogId = Cookies.get("singleBlogId");
  const singleBlogPrice = Cookies.get("singleBlogPrice");

  // Now you can use these values as needed, for example, log them
  console.log("Blog ID:", singleBlogId);
  console.log("Blog Price:", singleBlogPrice);

  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [nairaWalletBalance, setNairaWalletBalance] = useState();
  const [tajiWalletBalance, setTajiWalletBalance] = useState();
  const [usdtWalletBalance, setUsdtWalletBalance] = useState();

  //   Function to pay for a product with TAJI
  const handleCheckoutTaji = async () => {
    try {
      setLoading(true);

      // Display confirmation modal
      const result = await MySwal.fire({
        title: "Are you sure you want to complete this payment?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008001",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await axios.post(
          `${HOST_URL()}/blogs/checkout-blogs/taji/${singleBlogId}`,
          JSON.stringify({
            amount: singleBlogPrice,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === "Insufficient Taji balance") {
          toast.error(
            "Insufficient Taji balance. Please fund your wallet or pay via Naira or Usdt!!"
          );
        } else {
          toast.success("Product successfully purchased!!");
          navigate("/blogs/dashboard/library");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Please check your network connection! ");
    } finally {
      // Close the SweetAlert modal
      MySwal.close();
      setLoading(false);
      // Clear cookies after the operation
      Cookies.remove("singleBlogId");
      Cookies.remove("singleBlogPrice");
    }
  };

  //   Function to pay for a product with NAIRA
  const handleCheckoutUsdt = async () => {
    try {
      setLoading(true);

      // Display confirmation modal
      const result = await MySwal.fire({
        title: "Are you sure you want to complete this payment?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008001",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await axios.post(
          `${HOST_URL()}/market/checkout/usdt/${singleBlogId}`,
          JSON.stringify({
            amount: singleBlogPrice,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === "Insufficient USDT balance") {
          toast.error(
            "Insufficient USDT balance. Please fund your wallet or pay via Naira or Usdt!!"
          );
        } else {
          toast.success("Product successfully purchased!!");
          navigate("/blogs/dashboard/library");
          // Clear cookies after the operation
          Cookies.remove("singleBlogId");
          Cookies.remove("singleBlogPrice");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Please check your network connection! ");
    } finally {
      // Close the SweetAlert modal
      MySwal.close();
      setLoading(false);
    }
  };

  //   Function to pay for a product with NAIRA
  const handleCheckoutNaira = async () => {
    try {
      setLoading(true);

      // Display confirmation modal
      const result = await MySwal.fire({
        title: "Are you sure you want to complete this payment?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008001",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await axios.post(
          `${HOST_URL()}/market/checkout/naira/${singleBlogId}`,
          JSON.stringify({
            amount: singleBlogPrice,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message === "Insufficient Naira balance") {
          toast.error(
            "Insufficient Naira balance. Please fund your wallet or pay via Naira or Naira!!"
          );
        } else {
          toast.success("Product successfully purchased!!");
          navigate("/blogs/dashboard/library");
          // Clear cookies after the operation
          Cookies.remove("singleBlogId");
          Cookies.remove("singleBlogPrice");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Please check your network connection! ");
    } finally {
      // Close the SweetAlert modal
      MySwal.close();
      setLoading(false);
    }
  };

  // get all wallet ballance for the current user
  const getUsersWalletBalance = async (id) => {
    const userWalletBalance = await axios.get(`${HOST_URL()}/users/getMyObj`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(userWalletBalance.data.data.user.tajiWalletBalance);

    if (userWalletBalance.data.data.user) {
      setTajiWalletBalance(userWalletBalance.data.data.user?.tajiWalletBalance);
      setNairaWalletBalance(
        userWalletBalance.data.data.user?.nairaWalletBalance
      );
      setUsdtWalletBalance(userWalletBalance.data.data.user?.usdtWalletBalance);
    }
  };

  console.log(tajiWalletBalance);

  useEffect(() => {
    getUsersWalletBalance();
  }, []);

  return (
    <>
      <BlogNavbar />
      <Container maxW={`7xl`}>
        <div className="cart-container my-10">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="products lg:col-span-3 shadow-xl rounded-md px-4 lg:px-[46px] py-[24px] border-t-2">
              <div className="">
                <div className="toprow py-2">
                  <h4 className="text-lg font-semibold">Payment</h4>
                  <div className="py-6">
                    <button
                      className="bg-green-600 py-4 mb-5 rounded w-full text-white"
                      onClick={() => handleCheckoutTaji(singleBlogId)}
                    >
                      Pay From Taji Wallet
                    </button>
                    <button
                      className="bg-[#ff0066] py-4 mb-5 rounded w-full text-white"
                      onClick={() => handleCheckoutNaira(singleBlogId)}
                    >
                      Pay From Naira Wallet
                    </button>
                    <button
                      className="bg-[#000] py-4 mb-5 rounded w-full text-white"
                      onClick={() => handleCheckoutUsdt(singleBlogId)}
                    >
                      Pay From Usdt Wallet
                    </button>
                    {/* <PaystackButton
                          {...componentProps}
                          className="py-4 bg-black rounded w-full text-white"
                        />
                        <div className="flex justify-center mt-6">
                            <img src={PD} className="w-[310px]" />
                        </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[250px]">
              <div className="filter-div shadow-xl rounded-md p-4 border-t-2 h-[150px]">
                <h3 className="border-b pb-2">Checkout Price</h3>

                <div className="flex my-4 justify-between">
                  <p className="text-sm">
                    {/* Total Quantities ({totalQuantities && totalQuantities}) */}
                  </p>
                </div>

                <div className="flex my-4 justify-between">
                  <p className=" font-semibold uppercase">Subtotal:</p>
                  <p>
                    <Currency
                      quantity={singleBlogPrice && singleBlogPrice}
                      currency="NGN"
                    />
                  </p>
                </div>
              </div>
              <div className="filter-div shadow-xl mt-6 rounded-md p-4 border-t-2 h-[186px]">
                <h3 className="border-b pb-2">Wallet Balance</h3>

                <div className="flex my-4 justify-between">
                  <p className=" font-semibold uppercase">Naira</p>
                  <p>
                    <Currency quantity={nairaWalletBalance} currency="NGN" />
                  </p>
                </div>
                <div className="flex my-4 justify-between">
                  <p className=" font-semibold uppercase">Taji</p>
                  <p>
                    {/* TAJI {nairaToTajiEquivalent(user.tajiWalletBalance)} */}
                    TAJI {tajiWalletBalance}
                  </p>
                </div>
                <div className="flex my-4 justify-between">
                  <p className=" font-semibold uppercase">Usdt</p>
                  <p>
                    <Currency
                      quantity={usdtWalletBalance}
                      // currency="USDT"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentPage;
