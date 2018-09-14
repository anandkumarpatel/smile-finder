module.exports.get = () => {
  const winners = [{
    id: Math.random(),
    src: 'https://scontent.fatl1-2.fna.fbcdn.net/v/t1.0-9/35265984_10211693081498400_7824269676925419520_o.jpg?_nc_cat=0&oh=873a79d4167b0f11de14333ca06be2fd&oe=5C00C060',
  }]

  const others = [{
    id: Math.random(),
    src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/14424766_10207220101196688_1734589810218875448_o.jpg?_nc_cat=0&oh=485ad0afac805b434d4dd459809a2c15&oe=5C20D2B0',
  }, {
    id: Math.random(),
    src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/377332_3523287756735_318883860_n.jpg?_nc_cat=0&oh=117129c77b39c8fe870fdac2364f0af4&oe=5C23EB73',
  }, {
    id: Math.random(),
    src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/460657_3205693977089_603638759_o.jpg?_nc_cat=0&oh=f90539c1de7064078af40ba6289f2f3b&oe=5BF02C21',
  }, {
    id: Math.random(),
    src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/58499_1387366360035_3999010_n.jpg?_nc_cat=0&oh=59d7b90ebcfbe2914d000f3035c3bea6&oe=5C2F48EC',
  }, {
    id: Math.random(),
    src: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/38134_1346907868598_2250213_n.jpg?_nc_cat=0&oh=a280b37697d92a6f52373068483e0fcb&oe=5C3257EA',
  }]
  return JSON.parse(JSON.stringify({
    winners,
    others
  }))
}
