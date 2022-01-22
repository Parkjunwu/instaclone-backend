export const processHashtags = (caption:string) => caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w.]+/g)?.map(hashTag=>({
      where:{hashTag},
      create:{hashTag}
    })
  )