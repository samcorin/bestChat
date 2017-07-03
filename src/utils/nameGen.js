const nameGen = () => {
  var Generator = (list) => {
    return list[Math.floor((Math.random()*list.length))];
  }

  function Capitalze(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var one = ['agreeable', 'brave', 'calm', 'delightful', 'eager', 'faithful', 'gentle', 'happy', 'jolly', 'kind', 'lively', 'nice', 'obedient', 'proud', 'relieved', 'silly', 'thankful', 'victorious', 'witty', 'zealous', 'bitter', 'delicious', 'fresh', 'greasy', 'juicy', 'hot', 'icy', 'loose', 'melted', 'nutritious', 'prickly', 'rainy', 'rotten', 'salty', 'sticky', 'strong', 'sweet', 'tart', 'tasteless', 'uneven', 'weak', 'wet', 'wooden', 'yummy'];
  var two = ['revolution','investment','reading','airport','debt','success','apple','confusion','bath','grandmother','strategy','chocolate','tradition','marketing','cookie','interaction','tea','speaker','king','buyer','presence','law','procedure','permission','art','basket','addition','farmer','suggestion','manager','employee','dirt','thing','literature','data','delivery','blood','alcohol','historian','union','love','sample','analysis','secretary','media','elevator','departure','birthday','beer','combination'];

  return Generator(one) + "-" + Generator(two);
}

export default nameGen;
