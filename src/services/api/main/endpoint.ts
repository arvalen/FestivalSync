export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/user/login",
		CurrentUser: "/user/me",
		Register: "/user/register",
	},
	Profile: {
		GetProfile: "/user/me",
		UpdateProfile: "/user/update",
		GetProfileByUsername: "/user/:username",
	},
	Fest: {
		GetFest: "/post",
		GetFestById: "/post/:id",
		GetFestByUsername: "/user/:username/posts",
	},
	Like: {
		setLike: "/likes/:postId",
		removeLike: "/likes/:postId",
	},
};
