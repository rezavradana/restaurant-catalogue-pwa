import { loadingAppInititator } from '../../utils/loading-app-inititator';

const Home = {
  async render() {
    const jumbotron = document.querySelector('.jumbotron');
    const mainContent = document.querySelector('#maincontent');
    const navbar = document.querySelector('.navbar');
    navbar.style.backgroundColor = '';
    navbar.style.position = 'absolute';
    jumbotron.style.display = 'block';
    const homeContent = `
      <explore-restaurant class="explore-restaurant"></explore-restaurant>
      <our-kitchen class="our-kitchen"></our-kitchen>
      <popular-dish class="popular-dish"></popular-dish>
    `;
    mainContent.innerHTML = homeContent;
  },

  async afterRender() {
    const exploreRestaurant = document.querySelector('.explore-restaurant');
    loadingAppInititator('');
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#maincontent');

    setTimeout(() => {
      exploreRestaurant.dispatchEvent(new CustomEvent('render'));
      loadingAppInititator('none');
    }, 1000);

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  },
};

export default Home;
