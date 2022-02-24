import { handleShowMenu } from '../js/functions.js';


describe('Testing app', () => {

    it('Testing render app', () => {

        const menu = document.getElementById('menu');

        handleShowMenu()

        expect(menu).toBeInTheDocument();
    })

})