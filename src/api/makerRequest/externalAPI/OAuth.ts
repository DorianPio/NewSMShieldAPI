// // import express, { Request, Response } from "express";
// // import fetch from "node-fetch";

// // type UserInfoRequest = {
// //   url: string;
// //   method: string;
// //   accessToken: string | null;
// //   params: Record<string, string>;
// // };

// // type UserInfoResponse = {
// //   userInfo: string;
// // };

// // const router = express.Router();

// // router.post(
// //   "/user-info",
// //   async (
// //     req: Request<{}, {}, UserInfoRequest>,
// //     res: Response<UserInfoResponse>
// //   ) => {
// //     const { url, method, accessToken, params } = req.body;

// //     // Déterminer s'il s'agit d'une API OAuth2 ou non
// //     const isOAuth2 = accessToken !== null;

// //     // Configurer les options de requête
// //     let options: RequestInit = {
// //       method: method,
// //       headers: { "Content-Type": "application/json" },
// //     };

// //     // Ajouter le jeton d'accès si l'API est une API OAuth2
// //     if (isOAuth2) {
// //       options.headers["Authorization"] = `Bearer ${accessToken}`;
// //     }

// //     // Ajouter les paramètres de requête si nécessaire
// //     if (params !== null) {
// //       let urlParams = new URLSearchParams(params);
// //       url += "?" + urlParams.toString();
// //     }

// //     // Faire la requête à l'API
// //     const response = await fetch(url, options);

// //     // Vérifier le statut de la réponse HTTP
// //     if (!response.ok) {
// //       return res
// //         .status(response.status)
// //         .send(`La requête a échoué avec le code d'état ${response.status}.`);
// //     }

// //     // Extraire les informations utilisateur de la réponse HTTP
// //     const userInfo = await response.json();

// //     // Retourner les informations utilisateur sous forme de chaîne JSON
// //     res.send({ userInfo: JSON.stringify(userInfo) });
// //   }
// // );

// // export default router;

// import express, { Request, Response } from "express";
// import fetch, { RequestInit } from "node-fetch";

// type UserInfoRequest = {
//   apiEndpoint: string;
//   method: string;
//   accessToken: string | null;
//   params: Record<string, string> | null;
// };

// /**
//  * This function retrieves user information from an API using a specified method.
//  *
//  * @param userInfoReq An object containing the necessary parameters for the user information request.
//  *
//  * @returns A Promise containing the user information as a JSON string.
//  */
// async function getUserInfo(userInfoReq: UserInfoRequest): Promise<string> {
//   // Determine if the API requires OAuth2 authentication or not
//   const isOAuth2 = userInfoReq.accessToken !== null;

//   // Configure request options
//   let options: RequestInit = {
//     method: userInfoReq.method,
//     headers: { "Content-Type": "application/json" },
//   };

//   // Add access token if the API is an OAuth2 API
//   if (isOAuth2) {
//     options.headers["Authorization"] = `Bearer ${userInfoReq.accessToken}`;
//   }

//   // Add query parameters if necessary
//   if (userInfoReq.params !== null) {
//     let urlParams = new URLSearchParams(userInfoReq.params);
//     userInfoReq.apiEndpoint += "?" + urlParams.toString();
//   }

//   // Make the API request
//   const response = await fetch(userInfoReq.apiEndpoint, options);

//   // Check HTTP response status
//   if (!response.ok) {
//     throw new Error(`Request failed with status code ${response.status}.`);
//   }

//   // Extract user information from HTTP response
//   const userInfo = await response.json();

//   // Return user information as a JSON string
//   return JSON.stringify(userInfo);
// }

// const app = express();

// app.get("/user-info", async (req: Request, res: Response) => {
//   try {
//     const userInfoReq: UserInfoRequest = {
//       apiEndpoint: req.query.apiEndpoint as string,
//       method: req.query.method as string,
//       accessToken: req.query.accessToken as string | null,
//       params: req.query.params as Record<string, string> | null,
//     };
//     const userInfo = await getUserInfo(userInfoReq);
//     res.status(200).send(userInfo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });
