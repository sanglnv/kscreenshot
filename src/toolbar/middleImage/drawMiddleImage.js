function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);
  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const fileType = mimeString.split('/')[1];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const time = Date.now();
  const fileName = time + `.${fileType}`;
  const file = new File([ia], fileName, { type: mimeString, lastModified: time });

  return {
    lastModified: time,
    name: time + `.${fileType}`,
    originFileObj: file,
    size: file.size,
    type: file.type,
    uid: makeid(8),
  };
}

export default function drawMiddleImage(me) {
  me.rectangleCanvas.width = me.width * me.scale
  me.rectangleCanvas.height = me.height * me.scale
  let ctx = me.rectangleCanvas.getContext('2d')
  ctx.drawImage(
    me.kss,
    me.startX * me.scale,
    (me.startY + me.scrollTop) * me.scale,
    me.width * me.scale,
    me.height * me.scale,
    0,
    0,
    me.width * me.scale,
    me.height * me.scale
  )

  let dataURL = me.rectangleCanvas.toDataURL('image/png')
  const file = dataURItoBlob(dataURL);

  me.imgBase64 = dataURL
  me.snapshootList[0] = dataURL
  me.files[0] = file;
  me.currentImgDom.src = me.imgBase64
}
