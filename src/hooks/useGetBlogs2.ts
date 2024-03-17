
import {useQuery} from '@apollo/client'
import { theClient } from '@/graphql/apolloClient'
import { GEt_BLOGS_TWO } from '@/graphql/fragments/fetchBlogs2'
export const useGetBlogPosts2 = () =>  {
  const {data , loading, error} = useQuery(GEt_BLOGS_TWO, {
    variables : {
        "where": {
            "space": {
              "id_eq": "10900"
            }
          },
          "orderBy": "id_DESC", 
          "limit" : 90
        }, 

        
    }
  )

  return {
    data,
    loading,
    error

}
}