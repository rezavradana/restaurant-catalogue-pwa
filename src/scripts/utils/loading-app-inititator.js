const loadingAppInititator = (display) => {
  const loadingApp = document.querySelector('loading-app');
  loadingApp.style.display = display;
};

const blankDataDisplay = () => `
    <div class="blank-data">  
      <h1>Oops...Something Went Wrong</h1>
    </div>
  `;

export { loadingAppInititator, blankDataDisplay };
