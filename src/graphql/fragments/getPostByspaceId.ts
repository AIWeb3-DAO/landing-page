import {gql} from '@apollo/client'


export const GET_POST_BY_SPACE_ID = gql`

query SpaceById($spaceByIdId: String!, $where: PostWhereInput) {
    spaceById(id: $spaceByIdId) {
      about
      content
      createdAtTime
      createdByAccount {
        usernames
        updatedAtTime
        id
      }
      createdAtBlock
      createdOnDay
      email
      experimental
      handle
      hidden
      id
      image
      isShowMore
      name
      ownedByAccount {
        usernames
      }
      postsCount
      posts(where: $where) {
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
  }

`