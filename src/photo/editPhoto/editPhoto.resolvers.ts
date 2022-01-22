import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";
import { processHashtags } from "../photo.utils";

const editPhotoFn: Resolver = async(_,{id,caption},{client,loggedInUser}) => {
  // const oldPhoto = await client.photo.findFirst({
  //   where:{
  //     id,
  //     userId:loggedInUser.id
  //   },
  //   include:{
  //     hashTags:{
  //       select:{
  //         hashTag:true
  //       }
  //     }
  //   }
  // })
  const oldPhoto = await client.photo.findFirst({
    where:{
      id,
      userId:loggedInUser.id
    },
  }).hashTags({
    select:{
      hashTag:true
    }
  })
  // console.log(oldPhoto)
  if(!oldPhoto) return {ok:false,error:"Can't edit another user's Post"}
  await client.photo.update({
    where:{id},
    data:{
      caption,
      hashTags: {
        // disconnect:oldPhoto.hashTags,
        disconnect:oldPhoto,
        connectOrCreate:processHashtags(caption),
      }
    }
  })
  return {ok:true}
}
//   const {userId,caption:previousCaption} = await client.photo.findUnique({where:{id}})
//   if(userId !== loggedInUser.id) return {ok:false,error:"Can't edit another user's Post"}
//   if(caption === previousCaption) return {ok:true}

//   const hashTag = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w.]+/g)?.map(hash => ({hashTag:hash}))
//   const previousHash = await client.photo.findUnique({where:{id}}).hashTags({
//     select:{
//       hashTag:true,
//     }
//   })
//   let hashTagChange
//   if(hashTag !== previousHash){
//     hashTagChange=hashTag?.map(hashTag=>({
//       where:hashTag,
//       create:hashTag
//     })
//     )
//   }
//   console.log("New"+hashTagChange)
//   console.log("Old"+previousHash)

  // const updatePhoto = await client.photo.update({
  //   where:{id},
  //   data:{
  //     caption,
  //     ...((hashTagChange || previousHash) && {hashTags: {
  //       disconnect:previousHash,
  //       connectOrCreate:hashTagChange,
  //     }
  //   }),
  //   }
  // })
//   if(updatePhoto) {
//     return {ok:true}
//   }
//   return {ok:false, error:"Unknown Error"}
// }

const resolver: Resolvers = {
  Mutation:{
    editPhoto:protectResolver(editPhotoFn)
  }
}
export default resolver;