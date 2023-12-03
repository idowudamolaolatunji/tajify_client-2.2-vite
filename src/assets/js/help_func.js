
// FUNCTION THAT SETS THE SERVER API TO DEVELOPMENT OR PRODUCTION
// export const HOST_URL = () => {
// 	if (process.env.SERVER_ENV === "development") {
//         return "https://api.tajify.com/api";
// 	} else {
// 		return "http://localhost:3005/api";
// 	}
// };

export const HOST_URL = () => {
    if (import.meta.env.MODE === "development") {
        return "http://localhost:3005/api"; // Development server URL
    } else {
        return "https://api.tajify.com/api"; // Production server URL
    }
};

export const truncateString = (str, num) => {
    if (str?.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
};

export const calculateDiscount = (giveawayPrice, realPrice) => {
    const discount = realPrice - giveawayPrice;
    const discountPercentage = Math.round((discount / realPrice) * 100);
    return discountPercentage;
};
