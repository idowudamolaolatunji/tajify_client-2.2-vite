import { BrowserRouter, Routes, Route } from "react-router-dom";
import Writer from "./pages/writer";
import BlogHome from "./pages/blogHome";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import BlogDetails from "./pages/blogDetails";
import WritersProfile from "./pages/writersProfile";
import About from "./pages/about";
import ProtectedRoute, {
  UnProtectedRoute,
} from "./components/authentication/ProtectedRoute";
import Help from "./pages/help";
import Privacy from "./pages/privacy";
import EditorPage from "./pages/editor";
import Profile from "./pages/profile";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import PremiumContent from "./pages/premium/premiumContent";
import BlogsCategoryPage from "./components/blogsCategoryPage/BlogsCategoryPage";
import Wallet from "./pages/wallet/Wallet";
import Category from "./pages/Categories";
import StakingUi from "./components/StakingUi";
// import AdminUi from "./components/AdminUi";
import LiquidityPool from "./components/LiquidityPool";
import Settings from "./pages/settings";
import CategoryHead from "./pages/Categories/categoriesComponents/CategoryHead";
import OtpAuth from "./components/authentication/OtpAuth";
import Culture from "./pages/Categories/categoriesComponents/Culture";
import Health from "./pages/Categories/categoriesComponents/Health";
import Entertainment from "./pages/Categories/categoriesComponents/Entertainment";
import Finance from "./pages/Categories/categoriesComponents/Finance";
import Future from "./pages/Categories/categoriesComponents/Future";
import Travel from "./pages/Categories/categoriesComponents/Travel";
import Lifestyle from "./pages/Categories/categoriesComponents/Lifestyle";
import Sport from "./pages/Categories/categoriesComponents/Sport";
import Technology from "./pages/Categories/categoriesComponents/Technology";
import CreatorsProfile from "./pages/creatorsProfile/Index";
// import ThankYou from "./pages/thankyou/ThankYou";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/editor" element={<EditorPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/premium" element={<PremiumContent />}></Route>

          {/* <Route path="/admin" element={<AdminUi />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/staking" element={<StakingUi />}></Route>
          <Route path="/lp" element={<LiquidityPool />}></Route> */}
          
          {/* wallet */}
          <Route path="/wallet" element={<Wallet />} />

          {/* thank you */}
          {/* <Route path="/thank-you/:ref" element={<ThankYou />} /> */}
        </Route>
        {/* <Route element={<UnProtectedRoute />}> */}
          <Route path="/:id/blogs" element={<WritersProfile />}></Route>
          {/* THE PUBLIC PROFILE OF A CREATOR */}
          <Route path="/:id" element={<CreatorsProfile />}></Route>
          <Route path="/writer" element={<Writer />}></Route>
          <Route path="/details/:id" element={<BlogDetails />}></Route>
          {/* <Route path="/category/:category" element={<BlogsCategoryPage />}></Route> */}
          <Route path="/coming-soon" element={<ComingSoon />}></Route>
          <Route path="/" element={<BlogHome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/verify-otp" element={<OtpAuth />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/category/:category" element={<Category />}></Route>


          <Route path="/category/health" element={<Health />}></Route>
          <Route path="/category/entertainment" element={<Entertainment />}></Route>
          <Route path="/category/sport" element={<Sport />}></Route>
          <Route path="/category/travel" element={<Travel />}></Route>
          <Route path="/category/finance" element={< Finance />}></Route>
          <Route path="/category/future" element={<Future/>}></Route>
          <Route path="/category/culture" element={<Culture />}></Route>
          <Route path="/category/lifestyle" element={<Lifestyle />}></Route>
          <Route path="/category/technology" element={<Technology />}></Route>


          {/* Temporary, they're supposed to be protected routes */}
          {/* <Route path="/admin" element={<AdminUi />}></Route> */}
          <Route path="/staking" element={<StakingUi />}></Route>
          <Route path="/lp" element={<LiquidityPool />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
