/**
 * An object that represents the response from an OAuth2 token exchange or refresh operation.
 */

export type TokenResponse = {
  /**
   * The OAuth2 access token.
   */
  accessToken: string;

  /**
   * The OAuth2 refresh token.
   */
  refreshToken: string;

  /**
   * The number of seconds until the access token expires.
   */
  expiresIn: number;

  /**
   * The type of token, which is usually "Bearer".
   */
  tokenType: string;
};
