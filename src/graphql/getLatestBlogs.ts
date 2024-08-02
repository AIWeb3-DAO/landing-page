import { gql } from "@apollo/client";

export const GET_LATEST_BLOG = gql`
query Posts($where: PostWhereInput, $orderBy: [PostOrderByInput!], $offset: Int, $limit: Int) {
    posts(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      summary
      id
      createdAtTime
      title
      space {
        email
        handle
        id
        name
      }
      body
      image
      content
      downvotesCount
      experimental
    }
  }
`