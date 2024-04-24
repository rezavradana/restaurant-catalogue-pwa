import { loadingAppInititator } from '../../utils/loading-app-inititator';

const Favorite = {
  async render() {
    const mainContent = document.querySelector('#maincontent');
    const jumbotron = document.querySelector('.jumbotron');
    const navbar = document.querySelector('.navbar');
    if (jumbotron) {
      jumbotron.style.display = 'none';
    }
    navbar.style.backgroundColor = '#212529';
    navbar.style.position = 'relative';
    mainContent.innerHTML = `
        <explore-restaurant class="explore-restaurant"></explore-restaurant>
    `;
  },

  async afterRender() {
    const exploreRestaurant = document.querySelector('.explore-restaurant');
    loadingAppInititator('');
    setTimeout(() => {
      exploreRestaurant.dispatchEvent(new CustomEvent('render-favorite'));
      loadingAppInititator('none');
    }, 1000);
  },
};

export default Favorite;
