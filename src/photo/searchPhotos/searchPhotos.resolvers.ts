import { Resolver, Resolvers } from "../../types";

const searchPhotosFn: Resolver = (_,{keyword,page=1},{client}) => client.photo.findMany({
  where:{
    caption:{
      contains:keyword
    }
  },
  take:10,
  skip:10*(page-1)
})
// .photos({
//   take:10,
//   skip:10*(page-1)
// })

const resolver: Resolvers = {
  Query:{
    searchPhotos:searchPhotosFn
  }
}
export default resolver