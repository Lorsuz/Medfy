import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';

const imageUrls = 
  ['https://static.selpics-cloud.com/logotipo/logo_1669470479-6382190f52344.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4A…ZPyHsdf0J4ZPff0L4K8AALXuKXlLDDGkAAAAASUVORK5CYII=', 'https://static.selpics-cloud.com/logotipo/logo_1669470479-6382190f52344.png', 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0…gMC44OTUtMiAyLTJzMiAwLjg5NSAyIDJ6Ii8+Cjwvc3ZnPgo=', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0fa02081000151281.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0fa0658517404197.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0fa09241185517183.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0fae8db86794908.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0fa1b95864295495.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807887-6757cf0feac051843126228.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf1017d32692245335.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf103e80e904009426.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf1034718285291560.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf1057ffd2049017576.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf106bf7d546268569.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf106b4b2831850308.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf10979441355742507.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf10a56902033016737.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf10dac71700544235.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf10cfb2d69460377.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807888-6757cf10e202d1890790430.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf1121da3225020036.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11333f21842201213.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf114f584455726152.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf1151bcd198025424.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf1153a21657360842.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11a08b9130192942.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11a992261226764.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11b32cc2136234934.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11c4f8a1971642531.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11c344e1396764835.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807889-6757cf11df152929845396.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf12143441570320140.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf1220840156061910.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf1230aad860284260.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf12397e61176574099.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf123f87e2141565098.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf1269ec41957993218.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf127b4461520052894.jpg', 'https://cdn-selpics.youfocus.com.br/gallery/thumb_1733807890-6757cf1284832100672390.jpg']


function downloadImage(url, dest) {
  const protocol = url.startsWith('https') ? https : http;

  protocol.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Falha ao baixar ${url}: ${res.statusCode}`);
      return;
    }

    const fileStream = fs.createWriteStream(dest);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Imagem salva em: ${dest}`);
    });
  }).on('error', (err) => {
    console.error(`Erro ao baixar ${url}:`, err.message);
  });
}

const downloadDir = path.join(__dirname, 'images');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

imageUrls.forEach((url, index) => {
  const fileName = `image${index + 1}${path.extname(url)}`;
  const filePath = path.join(downloadDir, fileName);
  downloadImage(url, filePath);
});
