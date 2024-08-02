

import React, { createContext, useState, useContext, useEffect } from 'react';

//import { GET_USER_PROFILES_BY_ADDRESS } from '@/graphql/fragments/getUserProfiles';
//import { apolloClient } from '@/graphql/apolloClient';

import { jwtDecode } from "jwt-decode";
 type providerProps = {
  isGeneratingToken ? : any
  isWaitingForSignature ? :any
  logout : any
     verifyNonce : any
     userProfile : any
     toggleHandleModal: any
     isShowHandleModal : any
     selectedGame? : any
      handleSelectGame? : any
 } 
// Create a context
const UserContext = createContext<providerProps | undefined>(undefined);

export const useUserContext = (): providerProps => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error ("must be used in providers")
    }
    return context
}

  type ContextProps = {
    children : React.ReactNode
  }
export const UserContextProvider =({children} : ContextProps) => {
    //const {signMessageAsync}  = useSignMessage()
   const [userProfile, setuserProfile] = useState(null)
   const [isShowHandleModal, setisShowHandleModal] = useState(false)
   const [isGeneratingToken, setisGeneratingToken] = useState(false)
   const [isWaitingForSignature, setisWaitingForSignature] = useState(false)
   const [userInfo, setuserInfo] = useState(null)
   const [selectedGame, setselectedGame] = useState("")
   

      const toggleHandleModal = () => {
        setisShowHandleModal(!isShowHandleModal)
      }

        const handleSelectGame = (id : any)  =>  {
          setselectedGame(id)
        }


   


      useEffect(() => {
        const token = localStorage.getItem('kbg2_accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setuserProfile(decoded);
        }
    }, []);


   /*const  generateNonce =  async () =>  {
    try {
      setisGeneratingToken(true)
      const response = await fetch("https://sapo-rdii.onrender.com/api/auth/generate-nonce")
      const data = response.json()
      setisGeneratingToken(false)
      return data
    } catch (error) {
      console.log("the error", error)
      setisGeneratingToken(false)
    }
  }*/

  const verifyNonce = async (address :any)  =>  {

 
    try {
     
    // const nonce =  await generateNonce()
     // const message = `sign this  message to  sign in  ${nonce.nonce}`
     // console.log("thenonce is ", nonce)

      const payload = {
        message: "Hello from Aptos Wallet Adapter",
        nonce: "random_string",
      };

  setisWaitingForSignature(true)
        //const  signedMessage  =  await signMessageAsync({message})

        //const data =  {signedMessage, message , address}

        const  data = {address : address}

        const response = await fetch("https://got-be.onrender.com/auth/verify-nonce", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const token = await response.json();
        setisWaitingForSignature(false)
        console.log("The jwt tokens:", token);
        localStorage.setItem('kbg2_accessToken', token?.token);
        const decoded = jwtDecode(token?.token);
        setuserProfile(decoded);
    } catch (error) {
      console.log(error)
      setisWaitingForSignature(false)
    }
}

const logout = () => {
  localStorage.removeItem('kbg2_accessToken');
  setuserProfile(null);
};


   const value = {
    isGeneratingToken,
    isWaitingForSignature,
    logout,
      userProfile,
       verifyNonce,
      toggleHandleModal,
      isShowHandleModal,
      selectedGame,
      handleSelectGame
   }

   return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
   )

}