const paginate = (followers) => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({length: numberOfPages}, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  })
  return newFollowers;
  
  //own paginate logic
  // let outerArr = [];
  // let outerIndex = 0;
  // for(let j=0; j<numberOfPages; j++) {
  //   let innerArr = [];
  //   for(let i=0; i<itemsPerPage; i++){
  //     innerArr.push(followers[outerIndex]);
  //     outerIndex++;
  //     if(outerIndex >= followers.length) break;
  //   }
  //   outerArr.push(innerArr);
  // }
  // console.log(outerArr);
}

export default paginate;
