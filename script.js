const container = document.getElementById('carousel');
const tiles = container.querySelectorAll('.tile');

// Update active tile and side tilts
function updateActiveTile() {
  const containerCenter = container.scrollLeft + container.offsetWidth / 2;

  let closest = null;
  let closestDistance = Infinity;

  tiles.forEach(tile => tile.classList.remove('active','left','right'));

  tiles.forEach((tile,index) => {
    const tileCenter = tile.offsetLeft + tile.offsetWidth / 2;
    const distance = Math.abs(containerCenter - tileCenter);
    if(distance < closestDistance){
      closestDistance = distance;
      closest = index;
    }
  });

  tiles.forEach((tile,index) => {
    if(index === closest) tile.classList.add('active');
    else if(index < closest) tile.classList.add('left');
    else tile.classList.add('right');
  });
}

function centerMiddleTile() {
  const midIndex = Math.floor(tiles.length / 2);
  const midTile = tiles[midIndex];
  midTile.scrollIntoView({behavior:"auto", inline:"center"});
  updateActiveTile();
}
window.addEventListener('load', centerMiddleTile);


// Snap nearest tile on scroll end
let isScrolling;
container.addEventListener('scroll', () => {
  updateActiveTile();
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    const activeTile = container.querySelector('.tile.active');
    if(activeTile){
      activeTile.scrollIntoView({behavior: "smooth", inline: "center"});
    }
  }, 100);
});

window.addEventListener('resize', updateActiveTile);
updateActiveTile();

// Auto-scroll
let scrollAmount = 0;
const scrollStep = 0.3;
setInterval(() => {
  scrollAmount += scrollStep;
  if(scrollAmount >= container.scrollWidth - container.clientWidth) scrollAmount = 0;
  container.scrollLeft = scrollAmount;
  updateActiveTile();
}, 20);

// --- Center first tile on load ---
window.addEventListener('load', () => {
  if(tiles.length > 0){
    tiles[0].scrollIntoView({behavior: "auto", inline: "center"});
    updateActiveTile();
  }
});
