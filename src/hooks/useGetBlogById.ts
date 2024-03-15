
import {useQuery} from '@apollo/client'
import { theClient } from '@/graphql/apolloClient'
import { GET_POST_BY_ID } from '@/graphql/fragments/fetPostById'
export const useGetBlogById = (blogId : any) =>  {
  const {data , loading, error} = useQuery(GET_POST_BY_ID, {
    variables : {
        "postByIdId": blogId
      }

        
    }
  )

  return {
    data,
    loading,
    error

}
}