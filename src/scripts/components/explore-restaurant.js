import RestaurantDbSource from '../data/restaurantdb-source';
import FavoriteRestaurant from '../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../views/templates/template-creator';
import { blankDataDisplay } from '../utils/loading-app-inititator';

class ExploreRestaurant extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();

    this.addEventListener('render', () => {
      this._afterRender();
    });

    this.addEventListener('render-favorite', () => {
      this._afterRenderFavorite();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async _afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantsContainer = this._shadowRoot.querySelector('.list-content');
    if (restaurants) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML = blankDataDisplay();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async _afterRenderFavorite() {
    const restaurants = await FavoriteRestaurant.getAllRestaurant();
    const restaurantContainer = this._shadowRoot.querySelector('.list-content');
    const title = this._shadowRoot.querySelector('h1');
    title.innerText = 'Favorite Restaurant';

    if (restaurants) {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantContainer.innerHTML = blankDataDisplay();
    }
  }

  _updateStyle() {
    this._style.textContent = `
        .title-content h1{
            font-size: 30px;
        }

        .title-content{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .title-content .line{
            border: 2px solid #E30011;
            width: 150px;
        }

        .list-content{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          margin: 32px auto auto;
          grid-column-gap: 15px;
          grid-row-gap: 20px;
          justify-content: center;
        }
        
        .list-content .content{
          display: flex;
          flex-flow: column nowrap;
          gap: 5px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .list-content .content .thumbnail-content{
          width: 100%;
          height: 200px;
        }
        
        .list-content .content .thumbnail-content .wrapper-city{
          position: absolute;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          margin-top: 10px;
        }
        
        .list-content .content .thumbnail-content img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .list-content .content .body-content{
          padding: 16px 32px 32px 32px;
          display: flex;
          flex-direction: column;
        }
        
        .list-content .content .body-content span{
          font-weight: bold;
        }
        
        .list-content .content .body-content h1{
          font-size: 20px;
        }
        
        .list-content .content .body-content .detail-content{        
          display: flex;
          flex-direction: row;      
          width: fit-content;
        }

        .list-content .content .body-content .detail-content a {
          text-decoration: none;
          align-content: center;
          min-width: 44px;
          min-height: 44px;
          background-color: #E30011;
          border: 1px solid #E30011;
          width: fit-content;       
          padding: 5px 10px;
          border-radius: 7px;          
          cursor: pointer;
          color: white;
          font-weight: bold;    
        }
        
        .list-content .content .body-content .detail-content a:hover{
          background-color: white;
          border-color: #E30011;
          color: black;          
        }

        .container {     
          margin: auto;     
          padding: 32px;          
          max-width: 1000px;
        }

        .blank-data {
          display: flex;
          width: 100%;
          height: 100vh;
          text-align: center;
          justify-content: center;
          align-items: center;
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.append(this._style);
    this._shadowRoot.innerHTML
      += `
      <div class="container">      
        <div class="title-content">
            <h1>Explore Restaurant</h1>
            <div class="line"></div>
        </div>        
        <div class="list-content"></div>
      </div>
      `;
  }
}

customElements.define('explore-restaurant', ExploreRestaurant);
