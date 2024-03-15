
import {useQuery} from '@apollo/client'
import { theClient } from '@/graphql/apolloClient'
//import { GET_POST_BY_SPACE_ID } from '@/graphql/fragments/getPostByspaceId'
import { GET_POST_BY_SPACE_ID } from '@/graphql/fragments/getPostByspaceId'
export const useGetBlogPosts = () =>  {
  const {data , loading, error} = useQuery(GET_POST_BY_SPACE_ID, {
    variables : {
        "spaceByIdId": "10900",
      //  "orderBy":  "rootPost_id_DESC",
        "where": {
            "kind_eq": "RegularPost",
          }
        }, 

        
    }
  )

  return {
    data,
    loading,
    error

}
}