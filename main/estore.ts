import { ycForm } from '../templates/index';
import { yForm } from './yoco';
export const EshopPayments = async () => {
    // find yc-store element and add yc-cloud element
    const ycStore = document.getElementById('yc-store')
    if (ycStore) {
        const ycCloud = document.createElement('div')
        ycCloud.id = 'yc-cloud'
        ycCloud.className = 'yc-cloud '
        ycCloud.innerHTML = ycForm()
        document.body.prepend(ycCloud)
    }

}