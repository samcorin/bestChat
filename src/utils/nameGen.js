const nameGen = () => {
  var Generator = (list) => {
    return list[Math.floor((Math.random()*list.length))];
  }

  function Capitalze(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var one = [ 'brave', 'calm', 'eager', 'gentle', 'happy', 'jolly', 'kind', 'lively', 'nice', 'proud', 'silly', 'witty', 'bitter', 'fresh', 'greasy', 'juicy', 'hot', 'icy', 'loose', 'melted', 'rainy', 'rotten', 'salty', 'sticky', 'strong', 'sweet', 'tart', 'uneven', 'weak', 'wet', 'wooden', 'yummy'];
  var two = ['debt', 'apple', 'bath', 'cookie', 'tea', 'king', 'buyer', 'law', 'art', 'basket', 'farmer', 'dirt', 'thing', 'data', 'blood', 'union', 'love', 'sample', 'media', 'beer'];

  return Generator(one) + "-" + Generator(two);
}

export default nameGen;
