import { gql } from "@apollo/client";

export const GEt_BLOGS_TWO = gql`
query Posts($where: PostWhereInput, $orderBy: [PostOrderByInput!], $limit: Int) {
  posts(where: $where, orderBy: $orderBy, limit: $limit) {
    title
    createdAtTime
     body
        canonical
        content
        createdByAccount {
          usernames
          id
        }
        createdAtTime
        downvotesCount
        experimental
        format
        hidden
        id
        image
        upvotesCount
        tweetId
        title
        summary
        slug
        sharesCount
        link
        meta
        kind
        isComment
  }
}



`