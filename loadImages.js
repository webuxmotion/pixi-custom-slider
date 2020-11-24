export default function loadImages(paths, whenLoaded) {
  const imgs = [];
  const img0 = [];
  
  paths.forEach(function(path) {
    const img = new Image();

    img.onload = function() {
      imgs.push(img);
      img0.push({ path, img });
      if (imgs.length === paths.length) whenLoaded(img0);
    };

    img.src = path;
  })
}
