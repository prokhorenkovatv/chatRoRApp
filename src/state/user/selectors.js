export const selectIsLoggedIn = state => !!state.user.accessToken;
export const selectUserName = state => state.user.userData?.name;
export const selectUserPicture = state => state.user.userData?.picture;
