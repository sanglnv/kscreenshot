import { css, remove, typeChecking } from '../../util'
import drawMiddleImage from '../middleImage/drawMiddleImage'
import copy from '../copy'
import download from '../download'
import endAndClear from '../endAndClear'
import img from '../../assets/imgs/ok.png';

export default function completeBT(me) {
  let completeBT = document.createElement('span')
  completeBT.id = 'kssCompleteBT'
  completeBT.className = 'kssToolbarItemBT'
  completeBT.title = '完成截图'

  let completeImg = document.createElement('img')
  completeImg.className = 'kssToolbarItemImg'
  completeImg.src = img
  me.completeBT = completeImg

  completeBT.appendChild(completeImg)

  css(completeBT, {
    width: '40px',
    'line-height': '28px'
  })

  completeBT.addEventListener('click', async function() {
    me.isEdit = true

    const lastShot = me.snapshootList[me.snapshootList.length - 1]
    const lastFile = me.files[me.files.length - 1];
    copy(me, lastShot)
    me.needDownload === true && (await download(me))
    typeChecking(me.endCB) === '[object Function]' && me.endCB(lastFile, lastShot)
    endAndClear(me)
  })

  return completeBT
}
