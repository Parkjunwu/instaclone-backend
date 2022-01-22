import { uploadToS3 } from "../../shared/shared.utils";
import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";
import { processHashtags } from "../photo.utils";
// import { createWriteStream } from "fs";

// const { filename, createReadStream } = await file;
// const uploadName = `${loggedInUser.id}-${Date.now()}-${filename}`
// const write =  createWriteStream(`${process.cwd()}/uploads/${uploadName}`)
// createReadStream().pipe(write)
// const fileUrl = `http://localhost:4000/static/${uploadName}`;

// const ok = await client.photo.create({
//   data:{user:loggedInUser,file:fileUrl,caption}
// })
// if(!ok) return {ok:false, error:"can't upload"}
// return {ok:false}

const uploadPhotoFn: Resolver = async(_,{file,caption,},{client,loggedInUser}) => {
  let hashTags = null;
  if(caption) {
    hashTags = processHashtags(caption)
  }
  const fileUrl = await uploadToS3(file,loggedInUser.id,"upload")
  const a = await client.photo.create({
    data:{
      user:{
        connect:{
          id:loggedInUser.id
        },
      },
      file:fileUrl,
      caption,
      ...(hashTags && {hashTags:{
        connectOrCreate:hashTags
      }})
    }
  })
  // console.log(a)
  return a
}

const resolver:Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver
    (uploadPhotoFn)
  }
}
export default resolver