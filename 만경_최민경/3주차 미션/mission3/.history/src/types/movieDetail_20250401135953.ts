
export type movieDetail={
    avatar: {
        gravatar: {
          hash: string;
        };
        tmdb: {
          avatar_path: string | null;
        };
      };
      id: number;
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      include_adult: boolean;
      username: string;
}

export type movieDetailResponse={
    status: string;
    data: movieDetail;
}
// {
//     "avatar": {
//       "gravatar": {
//         "hash": "e60c230654147b852cc85fb3892a4b4a"
//       },
//       "tmdb": {
//         "avatar_path": null
//       }
//     },
//     "id": 21913813,
//     "iso_639_1": "ko",
//     "iso_3166_1": "KR",
//     "name": "",
//     "include_adult": false,
//     "username": "choimin06"
//   }