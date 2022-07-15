import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idApply:
    typeof window !== "undefined" ? localStorage.getItem("idapply") : false,
  kycApply:
    typeof window !== "undefined" ? localStorage.getItem("kycapply") : false,
  subcatselected: undefined,
  favArr: [],
  shopProduct:
    typeof window !== "undefined" ? localStorage.getItem("shop") : "",
  hasPaid: typeof window !== "undefined" ? localStorage.getItem("coin") : false,
  orderPay:
    typeof window !== "undefined" ? localStorage.getItem("orderpay") : false,
  video: [],
  phoneVerified:
    typeof window !== "undefined" && localStorage.getItem("phone") !== null
      ? localStorage.getItem("phone")
      : false,
  favLoad: 0,
  msgScroll: 0,
  messageRead: 0,
  fromCart: "",
  pusher: null,
  // messageRead: typeof window !== "undefined" ? localStorage.getItem("msg") : 0,
  verificationStatus:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("verify"))
      : null,
  userDetails:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("details"))
      : null,
  profileDetails:
    typeof window !== "undefined"
      ? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null
      : null,
  formDisabler: true,
  countrySelected: null,
  catfilter: typeof window !== "undefined" ? localStorage.getItem("cat") : null,
  login: typeof window !== "undefined" ? localStorage.getItem("login") : null,
  stateSelected: null,
  indexData:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("indexData"))
      : null,
  catId: null,
  searchFilter: "",
  indexApi: [],
  postAddata: {
    categoryid: "",
    subcategoryid: "",
    title: "",
    location: "",
    countrycode: "",
    states: "",
    phone: "",
    price: null,
    currencyCode: "",
    images: [],
    videofile: "",
    tag: [],
    description: "",
    userid: "",
    cityCode: "",
    plans: "",
    adsplanprice: "",
    postingchecker: false,
    symbo: "",
  },
  // update user profile things
  userUpdate: {
    states: "",
    lga: "",
    statesname:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userState"))
        : null,

    lganame:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userLga"))
        : null,
  },
  countryProductSearchEmpty: true,
  searchCountry: "",
  creatingNewProductForShop: false,
};

export const bellefuSlice = createSlice({
  name: "bellefu",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("login", state.login);
    },
    fetchData: (state, action) => {
      state.indexData = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("indexData", JSON.stringify(state.indexData));
      }
    },
    isDisabled: (state, action) => {
      state.formDisabler = action.payload;
    },
    payment: (state, action) => {
      state.hasPaid = action.payload;
      localStorage.setItem("coin", state.hasPaid);
    },
    orderPayment: (state, action) => {
      state.orderPay = action.payload;
      localStorage.setItem("orderpay", state.orderPay);
    },
    idpending: (state, action) => {
      state.idApply = action.payload;
      localStorage.setItem("idapply", state.idApply);
    },
    msgRead: (state) => {
      state.messageRead += 1;
      // localStorage.setItem('msg', state.messageRead)
    },
    handlePusher: (state, action) => {
      state.pusher = action.payload;
      // localStorage.setItem('msg', state.messageRead)
    },
    msgScroll: (state, action) => {
      state.msgScroll = action.payload;
      // localStorage.setItem('msg', state.messageRead)
    },
    shop: (state, action) => {
      state.shopProduct = action.payload;
      localStorage.setItem("shop", state.shopProduct);
    },
    kycpending: (state, action) => {
      state.kycApply = action.payload;
      localStorage.setItem("kycapply", state.kycApply);
    },
    phoneveri: (state, action) => {
      state.phoneVerified = action.payload;
      localStorage.setItem("phone", state.phoneVerified);
    },
    userFav: (state, action) => {
      state.favArr = action.payload;
    },
    handleVideo: (state, action) => {
      state.video = action.payload;
    },
    prevPath: (state, action) => {
      state.fromCart = action.payload;
    },
    favUpdated: (state) => {
      state.favLoad += 1;
    },
    ifVerified: (state, action) => {
      state.verificationStatus = action.payload;
    },
    updateIdpath: (state, action) => {
      state.catId = action.payload;
    },
    handleSearch: (state, action) => {
      state.searchFilter = action.payload;
    },

    chooseCountry: (state, action) => {
      state.countrySelected = action.payload;
    },
    chooseState: (state, action) => {
      state.stateSelected = action.payload;
    },
    handlePriceUpdate: (state, action) => {
      state.postAddata.price = action.payload;
    },

    // ##########################
    handleAdsPlanPriceUpdate: (state, action) => {
      state.postAddata.adsplanprice = action.payload;
    },
    handleAdsPostingCheckerUpdate: (state, action) => {
      state.postAddata.postingchecker = action.payload;
    },
    // ##################################################

    handleIndexApi: (state, action) => {
      state.indexApi = action.payload;
    },
    // userUpdate things
    handleStates: (state, action) => {
      state.userUpdate.states = action.payload;
    },
    handleLga: (state, action) => {
      state.userUpdate.lga = action.payload;
    },
    handleStatesname: (state, action) => {
      state.userUpdate.statesname = action.payload;
    },
    handleLganame: (state, action) => {
      state.userUpdate.lganame = action.payload;
    },

    // end here

    // postAds reducers please no vex

    handleCatUpdate: (state, action) => {
      state.postAddata.categoryid = action.payload;
    },
    handleSubcatUpdate: (state, action) => {
      state.postAddata.subcategoryid = action.payload;
    },
    handleTitleUpdate: (state, action) => {
      state.postAddata.title = action.payload;
    },
    handleLocationUpdate: (state, action) => {
      state.postAddata.location = action.payload;
    },
    handleCountryCodeUpdate: (state, action) => {
      state.postAddata.countrycode = action.payload;
    },

    handlePhoneUpdate: (state, action) => {
      state.postAddata.phone = action.payload;
    },
    handlePriceUpdate: (state, action) => {
      state.postAddata.price = action.payload;
    },
    handleTagUpdate: (state, action) => {
      state.postAddata.tag = action.payload;
    },
    handleDescriptionUpdate: (state, action) => {
      state.postAddata.description = action.payload;
    },
    handleImagesUpdate: (state, action) => {
      state.postAddata.images = action.payload;
    },
    handleVideoUpdate: (state, action) => {
      state.postAddata.videofile = action.payload;
    },
    handleUseridUpdate: (state, action) => {
      state.postAddata.userid = action.payload;
    },
    handleStateUpdate: (state, action) => {
      state.postAddata.states = action.payload;
    },
    setProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },

    Subcat: (state, action) => {
      state.subcatselected = action.payload;
    },
    selectCat: (state, action) => {
      state.catfilter = action.payload;
      localStorage.setItem("cat", state.catfilter);
    },

    handlePhoneUpdate: (state, action) => {
      state.postAddata.phone = action.payload;
    },
    handleTagUpdate: (state, action) => {
      state.postAddata.tag = action.payload;
    },
    handleCurrencyUpdate: (state, action) => {
      state.postAddata.currencyCode = action.payload;
    },
    handleCitycodeUpdate: (state, action) => {
      state.postAddata.cityCode = action.payload;
    },
    handlePlansUpdate: (state, action) => {
      state.postAddata.plans = action.payload;
    },
    handleSymbolUpdate: (state, action) => {
      state.postAddata.symbo = action.payload;
    },
    handleUserDetails: (state, action) => {
      state.userDetails = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("details", JSON.stringify(state.userDetails));
      }
    },
    countryProductSearchEmpty: (state, action) => {
      state.countryProductSearchEmpty = action.payload;
    },
    searchCountry: (state, action) => {
      state.searchCountry = action.payload;
    },
    newProductForShop: (state, action) => {
      state.creatingNewProductForShop = action.payload;
    },
    // E don end here
  },
});

// Action creators are generated for each case reducer function
export const {
  isLoggedIn,
  shop,
  isDisabled,
  orderPayment,
  chooseCountry,
  handleIndexApi,
  handleSearch,
  payment,
  updateIdpath,
  msgScroll,
  fetchData,
  userFav,
  Subcat,
  msgRead,
  selectCat,
  favUpdated,
  chooseState,
  handleVideo,
  setProfileDetails,
  handleUseridUpdate,
  handleImagesUpdate,
  handleDescriptionUpdate,
  handleTagUpdate,
  handlePriceUpdate,
  handlePhoneUpdate,
  handleCountryCodeUpdate,
  handleLocationUpdate,
  handleTitleUpdate,
  handleSubcatUpdate,
  handleCatUpdate,
  handleStateUpdate,
  handleCurrencyUpdate,
  handleCitycodeUpdate,
  handlePlansUpdate,
  handleSymbolUpdate,
  handleUserDetails,
  handleStates,
  idpending,
  handleLga,
  prevPath,
  ifVerified,
  handleLganame,
  kycpending,
  handleStatesname,
  handleVideoUpdate,
  countryProductSearchEmpty,
  searchCountry,
  phoneveri,
  handlePusher,
  newProductForShop,
  handleAdsPlanPriceUpdate,
  handleAdsPostingCheckerUpdate,
} = bellefuSlice.actions;

export const login = (state) => state.bellefu.login;
export const profileDetails = (state) => state.bellefu.profileDetails;
export const userUpdate = (state) => state.bellefu.userUpdate;
export const selectDisable = (state) => state.bellefu.formDisabler;
export const homeData = (state) => state.bellefu.indexData;
export const changeId = (state) => state.bellefu.catId;
export const userDId = (state) => state.bellefu.userDetails;
export const verified = (state) => state.bellefu.verificationStatus;
export const country = (state) => state.bellefu.searchCountry;
export const postadsData = (state) => state.bellefu.postAddata;
export const isProductForShop = (state) =>
  state.bellefu?.creatingNewProductForShop;
// export const prouductSearch = (state) => state.bellefu.countryProductSearch;
// export const selectLogin = (state) => {
//   state.bellefu.login;
// };
// export const selectDisable = (state) => {
//   state.bellefu.formDisabler;
// };
// export const countryChoice = (state) => {
//   state.bellefu
// }

export default bellefuSlice.reducer;
