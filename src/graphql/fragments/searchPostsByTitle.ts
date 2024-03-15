import { gql } from "@apollo/client";

  export  const  SEARCH_POSTS_BY_TITLE  = gql`
  
  query Posts($where: PostWhereInput) {
    posts(where: $where) {
      upvotesCount
      title
      image
      id
    }
  }
  `