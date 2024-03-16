// export const isLogin = async () => {
//   console.log('get session is running');
//   // const url = "http://localhost:3050/v1/api/get-session";
//   const url = "http://localhost:3050/get-session";

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key":
//         "159fe76366a62f33a329e9709ed117f680280458db1ea73580a66e456bca4d90f0d1ffeb24344b63115fa9f0293f3992e758076d27fd594393e9204fe8874ee1",
//     },
//     credentials: 'include',
//     // body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const responseData = await response.json();
//   console.log('responseData', responseData);
  
//   return responseData?.name || 'Guest'
// };