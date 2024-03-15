import { gql } from "@apollo/client";

export    const  GET_POST_BY_ID = gql`
query PostById($postByIdId: String!) {
    postById(id: $postByIdId) {
      body
      content
      createdAtBlock
      createdAtTime
      createdByAccount {
        id
        usernames
      }
      id
      image
      summary
      title
      upvotesCount
      downvotesCount
      createdOnDay
      sharesCount
    }
  }

`