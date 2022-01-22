import { Resolver, Resolvers } from "../types"

const userFn:Resolver = ({userId},_,{client}) => client.user.findUnique({where:{id:userId}})

const hashTagsFn:Resolver = async({id},_,{client}) => {
  // const a = await client.photo.findUnique({where:{id}})
  //   .hashTags({
  //   // skip:5,
  //   take:5,
  // })
  // console.log(a)
  // return a
  const b = await client.hashTag.findMany({where:{photos:{some:{id}}}})
  // console.log(b)
  return b;
}

const totalPhotosFn:Resolver = ({id},_,{client}) => client.photo.count({
  where:{
    hashTags:{
      some:{
        id
      }
    }
  }
})

const photosFn:Resolver = async ({id},{page=1,cursorId},{client}) => {
  const take = 10
  const a = await client.hashTag.findUnique({where:{id}}).photos({
    take,
    skip:take*(page-1),
    ...(cursorId && {cursor:{id:cursorId}})
  })
  // console.log(a)
  return {photos:a,cursorId:a[a.length-1].id,page:page+1}
}

const likesFn:Resolver = ({id},_,{client}) => client.like.count({where:{photoId:id}})

const isMineFn:Resolver = ({userId},_,{loggedInUser}) => userId===loggedInUser?.id

const commentsFn:Resolver = ({id},_,{client}) => client.comment.findMany({
  where:{
    photoId:id,
  },
  include:{
    user:true,
  },
})
// client.photo.findUnique({
//   where:{
//     id
//   }
// }).comments({
  // include:{
  //   user:{
  //     select:{
  //       id:true,
  //       userName:true,
  //       avatar:true
  //     }
  //   }
  // }
// })


const commentNumberFn:Resolver = ({id},_,{client}) => client.comment.count({where:{
  photoId:id
}})

const isLikedFn: Resolver = async({id},_,{loggedInUser,client}) => {
  if(!loggedInUser) return false;
  const ok = await client.like.findUnique({
    where:{
      photoId_userId:{
        photoId:id,
        userId:loggedInUser.id,
      }
    },
    select:{
      id:true,
    }
  })
  return Boolean(ok);
}
const resolver: Resolvers = {
  Photo:{
    user:userFn,
    hashTags:hashTagsFn,
    likes:likesFn,
    isMine:isMineFn,
    comments:commentsFn,
    commentNumber:commentNumberFn,
    isLiked:isLikedFn,
  },
  HashTag:{
    totalPhotos:totalPhotosFn,
    photos:photosFn,
  }
} 

export default resolver