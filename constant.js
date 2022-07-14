import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const imageBaseUrl = "https://bellefu.inmotionhub.xyz/";
// export const imageBaseUrl =
//   "https://phpstack-794034-2715115.cloudwaysapps.com/";
export const productImageUrl = `${imageBaseUrl}get/product/image/`;
export const shopApi = `${imageBaseUrl}api/shop/`;

export const UserAvataUrl = `${imageBaseUrl}get/user/images/`;

export const APIV3 = `${imageBaseUrl}api/v3/`;

export const apiData = `${imageBaseUrl}api/general/`;

export const indexAPI = `${imageBaseUrl}api/web30/get/web/index`;

export const CategoryImage = `${imageBaseUrl}category/image/`;

export const sliderImage = `${imageBaseUrl}slides/image/`;

export const sliderUrl = `${imageBaseUrl}get/sliders/image/`;

export const AnnoucementsUrl = `${imageBaseUrl}get/custom/image/`;

export const categoryUrl = `${imageBaseUrl}get/category/image/`;

export const webApi = `${imageBaseUrl}api/web30/`;

export const commercialUrl = `${imageBaseUrl}get/commercial/image/`;

export const storeUrl = `${imageBaseUrl}get/store/image/`;

export const videoUrl = `${imageBaseUrl}get/video/`;

export default function Loader({ isLoading }) {
  return (
    <Backdrop
      sx={{ color: "#FFA500", zIndex: "100", textAlign: "center" }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
