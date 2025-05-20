// 在script.js开头添加初始化代码
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    // 自动显示库存当有物品时
    if (Object.values(inventory).some(count => count > 0)) {
        showInventory();
    }
});

// 初始化剩余抽取次数
let remainingPulls = 0;
let inventory = {
    'Torn Map Fragment': 0,
    "Squirrel's Blessing": 0,
    'Compass (30min)': 0,
    'Water Purifier': 0,
    'Fire Starter': 0,
    'Poisonous Berry': 0,
    'Local Guide (1h)': 0,
    'Emergency Helicopter': 0
};

const remainingPullsElement = document.getElementById('remaining-pulls');
const topBanner = document.getElementById('top-banner');
const inventoryListElement = document.getElementById('inventory-list');

// 如果剩余抽取次数为0，显示顶部横幅
function checkRemainingPulls() {
    remainingPullsElement.textContent = remainingPulls;
    topBanner.style.display = 'block';
}

// 初始检查
checkRemainingPulls();

function showInventory() {
    const modal = document.getElementById('inventory-modal');
    modal.classList.add('active');
    updateInventoryDisplay(); // 强制刷新库存显示
    // 添加关闭按钮事件
    document.querySelector('.close-button').onclick = closeInventory;
}

function closeInventory() {
    document.getElementById('inventory-modal').classList.remove('active');
}

// 更新库存显示
function updateInventoryDisplay() {
    inventoryListElement.innerHTML = '';
    let hasItems = false;
    
    // 遍历所有库存物品
    for (const item in inventory) {
        if (inventory[item] > 0) {
            hasItems = true;
            const inventoryItem = document.createElement('div');
            inventoryItem.className = 'inventory-item';
            inventoryItem.innerHTML = `
                <div class="inventory-item-name">${item}</div>
                <div class="inventory-item-count">${inventory[item]}x</div>
            `;
            inventoryListElement.appendChild(inventoryItem);
        }
    }
    
    // 处理空库存状态
    if (!hasItems) {
        inventoryListElement.innerHTML = '<p style="color: #cccccc;">No items in inventory</p>';
    }

    // 自动显示库存逻辑（当有新物品时）
    const modal = document.getElementById('inventory-modal');
    if (hasItems && !modal.classList.contains('active')) {
        showInventory();
    }
}

updateInventoryDisplay();

const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    showMessage('Welcome to your journey!', 'Your location data is being sold to predators. Enjoy!');
    document.querySelector('.map-container').scrollIntoView({behavior: 'smooth'});
});

const pullButton = document.querySelector('.pull-button');
pullButton.addEventListener('click', () => {
    if (remainingPulls < 1) {
        showMessage('Not enough pulls', 'You need to recharge to perform this action', true);
    } else {
        performPull();
    }
});

const pullButton10 = document.querySelector('.pull-button10');
pullButton10.addEventListener('click', () => {
    if (remainingPulls < 10) {
        showMessage('Not enough pulls', 'You need to recharge to perform this action', true);
    } else {
        performPull(10);
    }
});

const sosButton = document.querySelector('.sos-button');
sosButton.addEventListener('click', () => {
    showMessage('Confirm SOS', 'Activate SOS beacon for ¥299?', true);
});

// 导航按钮
const yanchengButton = document.querySelector('.navigation-button.yancheng');
const dianshanhuButton = document.querySelector('.navigation-button.dianshanhu');
const qiandengButton = document.querySelector('.navigation-button.qiandeng');
const suzhouButton = document.querySelector('.navigation-button.suzhou');
const shanghaiButton = document.querySelector('.navigation-button.shanghai');
const routeDisplay = document.querySelector('.navigation-route');

yanchengButton.addEventListener('click', () => {
    routeDisplay.innerHTML = `
        <h3>Yancheng</h3>
        <p><span class="distance">120 km</span> · <span class="duration">1h 45m</span></p>
        <div class="directions" style="margin-top: 1rem;">
            <p>"Take the K313 highway southeast. After 30 km, turn right onto the S228. Continue for 80 km until you reach the Yancheng city limits. Avoid the main roads - take the scenic route through the marshlands. Turn left at the third abandoned bridge and follow the river upstream for 5 km. Cross the river and continue north for 10 km. Turn right at the old windmill and follow the dirt road to the city."</p>
        </div>
    `;
});

dianshanhuButton.addEventListener('click', () => {
    routeDisplay.innerHTML = `
        <h3>Dianshanhu</h3>
        <p><span class="distance">30 km</span> · <span class="duration">30m</span></p>
        <div class="directions" style="margin-top: 1rem;">
            <p>"Follow the K128 highway west until you reach the water treatment plant. Turn left onto the Dianshan Road. After 15 km, park your vehicle and continue on foot along the reed path. The lake is 2.5 km from the parking area. Walk past the reeds and follow the duck path. Turn left at the third duck and continue until you reach the shoreline. Follow the shore clockwise for 1 km to reach the scenic viewpoint."</p>
        </div>
    `;
});

qiandengButton.addEventListener('click', () => {
    routeDisplay.innerHTML = `
        <h3>Qiandeng</h3>
        <p><span class="distance">45 km</span> · <span class="duration">1h</span></p>
        <div class="directions" style="margin-top: 1rem;">
            <p>"Take the G312 highway southwest. After 25 km, exit onto the S204 towards Qiandeng. Drive for 15 km, passing the ancient stone bridge. Continue past the town center and park at the old silk factory. Walk 1 km northeast along the canal to reach the historical area. Cross the canal at the old stone bridge and follow the cobblestone path. Turn left at the fourth lantern and continue until you reach the town square."</p>
        </div>
    `;
});

suzhouButton.addEventListener('click', () => {
    routeDisplay.innerHTML = `
        <h3>Suzhou</h3>
        <p><span class="distance">90 km</span> · <span class="duration">1h 20m</span></p>
        <div class="directions" style="margin-top: 1rem;">
            <p>"Follow the G312 highway south. After 40 km, merge onto the S58 towards Suzhou. Take the second exit at the roundabout onto the S227. Continue for 30 km until you reach the Suzhou city limits. Navigate through the traffic circles to reach the ancient city center. Turn right at the third bridge and follow the canal path. Turn left at the silk market and continue until you reach the historic area."</p>
        </div>
    `;
});

shanghaiButton.addEventListener('click', () => {
    routeDisplay.innerHTML = `
        <h3>Shanghai</h3>
        <p><span class="distance">100 km</span> · <span class="duration">1h 30m</span></p>
        <div class="directions" style="margin-top: 1rem;">
            <p>"Take the G60 highway southeast. After 50 km, exit onto the S32 towards Shanghai. Merge onto the G1503 outer ring road. Follow signs for the city center. Avoid the main expressways - take the scenic route along the Huangpu River. Turn right at the first Ferris wheel and follow the river path. Cross the river at the old stone bridge and continue for 2 km. Turn left at the third skyscraper and follow the tree-lined avenue to the city center."</p>
        </div>
    `;
});

// 修复后的showMessage函数
function showMessage(title, content, isPayment = false, amount = null, pulls = null) {
    const overlay = document.getElementById('message-overlay');
    const titleElement = document.getElementById('message-title');
    const contentElement = document.getElementById('message-content');
    const closeElement = document.getElementById('message-close');
    
    titleElement.textContent = title;
    contentElement.textContent = content;
    
    overlay.style.display = 'flex';
    
    // 清除之前的点击事件
    closeElement.onclick = null;
    
    closeElement.onclick = () => {
        overlay.style.display = 'none';
        if (isPayment && amount !== null && pulls !== null) {
            showCreditCardModal(amount, pulls);
        }
    };
}

// 修改后的充值按钮事件监听器
const rechargeButtons = document.querySelectorAll('.recharge-select');
rechargeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentElement;
        const amount = parent.getAttribute('data-amount');
        const pulls = parent.getAttribute('data-pulls');
        
        // 传递金额和抽卡次数参数
        showMessage(
            `Recharge ¥${amount}`, 
            `Recharge ¥${amount} for ${pulls} pulls?`,
            true,
            amount,
            pulls
        );
    });
});

// 修改后的信用卡支付确认函数
function showCreditCardModal(amount = null, pulls = null) {
    const modal = document.getElementById('credit-card-modal');
    modal.style.display = 'flex';
    
    document.getElementById('confirm-payment').onclick = () => {
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('card-expiry').value;
        const cvv = document.getElementById('card-cvv').value;
        
        if (cardNumber && expiry && cvv) {
            if (amount !== null && pulls !== null) {
                remainingPulls += parseInt(pulls);
                checkRemainingPulls();
                showMessage('Payment Successful', `Successfully recharged ${pulls} pulls!`);
            }
            modal.style.display = 'none';
            // 清空输入框
            document.getElementById('card-number').value = '';
            document.getElementById('card-expiry').value = '';
            document.getElementById('card-cvv').value = '';
        } else {
            showMessage('Payment Failed', 'Please fill in all credit card details.');
        }
    };
}

// 执行单次抽取
function performPull(count = 1) {
    for (let i = 0; i < count; i++) {
        const chance = Math.random() * 100;
        let resultItem = '';
        
        if (chance < 0.2) {
            // 传奇物品
            const legendaryItems = ['Local Guide (1h)', 'Emergency Helicopter'];
            resultItem = legendaryItems[Math.floor(Math.random() * legendaryItems.length)];
        } else if (chance < 0.9) {
            // 史诗物品
            const epicItems = ['Fire Starter', 'Poisonous Berry'];
            resultItem = epicItems[Math.floor(Math.random() * epicItems.length)];
        } else if (chance < 10) {
            // 稀有物品
            const rareItems = ['Compass (30min)', 'Water Purifier'];
            resultItem = rareItems[Math.floor(Math.random() * rareItems.length)];
        } else {
            // 普通物品
            const commonItems = ['Torn Map Fragment', "Squirrel's Blessing"];
            resultItem = commonItems[Math.floor(Math.random() * commonItems.length)];
        }
        
        // 添加到库存
        inventory[resultItem]++;
        
        // 显示视觉反馈
        if (count === 1) {
            let rarity = 'Common';
            if (chance < 0.2) rarity = 'Legendary';
            else if (chance < 0.9) rarity = 'Epic';
            else if (chance < 10) rarity = 'Rare';
            
            showMessage('Pull Result', `You received: ${resultItem} (${rarity})`);
        }
    }
    
    remainingPulls -= count;
    checkRemainingPulls();
    updateInventoryDisplay();
    setTimeout(showInventory, 1000);
}

// 添加库存切换功能
function toggleInventory() {
    const sidebar = document.getElementById('inventory-sidebar');
    sidebar.classList.toggle('collapsed');
    
    // 使用JSON存储保证类型正确
    localStorage.setItem('inventoryCollapsed', JSON.stringify(sidebar.classList.contains('collapsed')));
}

// 初始化侧边栏状态
window.addEventListener('load', () => {
    const savedState = localStorage.getItem('inventoryCollapsed');
    const sidebar = document.getElementById('inventory-sidebar');
    
    // 正确转换存储的字符串为布尔值
    if (savedState === 'false') {
        sidebar.classList.remove('collapsed');
    } else {
        sidebar.classList.add('collapsed');
    }
});

// 更新库存更新函数以在添加新物品时自动展开
function updateInventoryDisplay() {
    inventoryListElement.innerHTML = '';
    let hasItems = false;
    
    for (const item in inventory) {
        if (inventory[item] > 0) {
            hasItems = true;
            const inventoryItem = document.createElement('div');
            inventoryItem.className = 'inventory-item';
            inventoryItem.innerHTML = `
                <div class="inventory-item-name">${item}</div>
                <div class="inventory-item-count">${inventory[item]}x</div>
            `;
            inventoryListElement.appendChild(inventoryItem);
        }
    }
    
    if (!hasItems) {
        inventoryListElement.innerHTML = '<p style="color: #cccccc;">No items in inventory</p>';
    }

    // 改进的自动展开逻辑
    const sidebar = document.getElementById('inventory-sidebar');
    if (hasItems && sidebar.classList.contains('collapsed')) {
        toggleInventory();
        setTimeout(() => {
            if (!sidebar.classList.contains('collapsed')) {
                toggleInventory();
            }
        }, 3000);
    }
}

// 激活SOS
function activateSOS() {
    showMessage('SOS Activated', 'SOS signal activated! A rescue team may or may not be on the way.');
}


// 初始化地图
let map = L.map('dynamic-map', {
    zoomControl: false,
    attributionControl: false
}).setView([31.2304, 121.4737], 12); // 上海中心坐标

// 添加自定义图块
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 10,
    detectRetina: true
}).addTo(map);

// 添加谜题导航系统
let currentStep = 0;
const poeticSteps = [
    {
        clue: "Seek the oak that weeps sap northward",
        position: [31.2456, 121.4978],
        effect: () => inventory["Torn Map Fragment"]++
    },
    {
        clue: "Follow the crow's third caw",
        position: [31.2203, 121.4612],
        effect: () => map.setZoom(14)
    },
    {
        clue: "Let the setting sun guide your left foot",
        position: [31.2029, 121.4351],
        effect: () => showMessage("Final Step", "The treasure lies beneath!")
    }
];

// 绘制谜题路径
let mysteryPath = L.polyline(
    poeticSteps.map(step => step.position),
    {color: '#7cfc00', dashArray: '10 10'}
).addTo(map);

// 实时位置追踪
let userMarker;
navigator.geolocation.watchPosition(position => {
    if (!userMarker) {
        userMarker = L.marker(
            [position.coords.latitude, position.coords.longitude],
            {icon: L.divIcon({className: 'user-location-marker'})}
        ).addTo(map);
    } else {
        userMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
    }
    
    checkProximity([position.coords.latitude, position.coords.longitude]);
});

function checkProximity(currentPos) {
    const target = poeticSteps[currentStep].position;
    const distance = map.distance(currentPos, target);
    
    if (distance < 50) { // 50米范围内
        document.querySelector('.confirm-step').disabled = false;
        map.flyTo(currentPos, 16);
    }
}

function confirmStep() {
    poeticSteps[currentStep].effect();
    currentStep = (currentStep + 1) % poeticSteps.length;
    updatePoeticNavigation();
    showMessage("Step Completed", "New clue revealed!");
}

function updatePoeticNavigation() {
    const navDisplay = document.getElementById('poetic-nav');
    navDisplay.innerHTML = `
        <p class="current-clue">${poeticSteps[currentStep].clue}</p>
        <div class="progress">Step ${currentStep + 1}/${poeticSteps.length}</div>
    `;
    
    // 当有指南针时显示方向指示
    if (inventory['Compass (30min)'] > 0) {
        navDisplay.innerHTML += `<div class="compass-direction">▲ ${getBearing(userMarker.getLatLng(), poeticSteps[currentStep].position)}°</div>`;
    }
}

// 计算方位角函数
function getBearing(from, to) {
    const φ1 = from.lat * Math.PI/180;
    const φ2 = to.lat * Math.PI/180;
    const Δλ = (to.lng - from.lng) * Math.PI/180;
    
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    return ((Math.atan2(y, x) * 180/Math.PI) + 360) % 360;
}

// 库存物品与地图的交互
function applyInventoryEffects() {
    if (inventory['Torn Map Fragment'] > 0) {
        mysteryPath.setStyle({dashArray: null});
    }
    if (inventory['Local Guide (1h)'] > 0) {
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) layer.bindTooltip("📍");
        });
    }
}

//openrouteservice API

// 初始化时更新导航提示
updatePoeticNavigation();

// 使用Leaflet Routing Machine和OpenRouteService API
L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    formatter: new L.Routing.simplifiedLine(),
    lineOptions: {
        styles: [{color: '#7cfc00', opacity: 0.7, weight: 5}]
    }
}).addTo(map);

let routeControl;
const routeHistory = JSON.parse(localStorage.getItem('routeHistory')) || [];

const ORS_API_KEY = 'API_KEY_HERE'; // 替换这里
async function geocodeAddress(address) {
    try {
        const response = await fetch(
            `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(address)}`
        )
        } catch (error) {
        showMessage('Geocoding Error', 'Oops!! A squiril have stolen your Map.');
        return null;
    }
}

async function calculateRoute() {
    const start = document.getElementById('start-point').value;
    const end = document.getElementById('end-point').value;
    
    const startCoords = await geocodeAddress(start);
    const endCoords = await geocodeAddress(end);

    if (startCoords && endCoords) {
        if (routeControl) map.removeControl(routeControl);
        
        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(startCoords),
                L.latLng(endCoords)
            ],
            router: L.Routing.openrouteservice({
                apiKey: ORS_API_KEY, // 使用新变量
                profile: 'foot-hiking'
            }),
            formatter: {
                formatInstructions: instructions => {
                    const poeticInstructions = instructions.map((step, index) => 
                        `${index + 1}. ${poeticTranslate(step.text)}`
                    );
                    document.getElementById('route-instructions').innerHTML = poeticInstructions.join('<br>');
                    return '';
                }
            }
        }).addTo(map);

        // 保存路线历史
        routeHistory.push({start, end, timestamp: new Date()});
        localStorage.setItem('routeHistory', JSON.stringify(routeHistory));
        
        // 使用卡牌增强导航
        applyNavigationEnhancements(startCoords, endCoords);
    }
}

function poeticTranslate(instruction) {
    const metaphors = {
        'Head': 'Follow the whispering wind',
        'Turn left': 'Let the setting sun guide your left foot',
        'Turn right': 'Follow the crow\'s shadow to your right',
        'Continue': 'Walk where the earth feels softest',
        'Destination': 'The journey ends where the ancient trees gather'
    };
    return Object.entries(metaphors).reduce((acc, [key, val]) => 
        acc.replace(new RegExp(key, 'i'), val), instruction);
}

function applyNavigationEnhancements(start, end) {
    if (inventory['Compass (30min)'] > 0) {
        L.marker([(start[0]+end[0])/2, (start[1]+end[1])/2], {
            icon: L.divIcon({
                className: 'compass-marker',
                html: '<div class="compass-animation">🧭</div>'
            })
        }).addTo(map);
    }
    
    if (inventory['Torn Map Fragment'] > 0) {
        map.eachLayer(layer => {
            if (layer instanceof L.Polyline) layer.setStyle({dashArray: null});
        });
    }
}

// 初始化时加载历史路线
window.addEventListener('load', () => {
    if (routeHistory.length > 0) {
        const lastRoute = routeHistory[routeHistory.length - 1];
        document.getElementById('start-point').value = lastRoute.start;
        document.getElementById('end-point').value = lastRoute.end;
    }
});
function initMap() {
    map = L.map('dynamic-map', {
        zoomControl: false,
        attributionControl: false
    }).setView([31.2304, 121.4737], 12);

    // 添加图层加载检测
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        detectRetina: true
    }).on('tileload', () => {
        document.getElementById('dynamic-map').classList.add('loaded');
    }).addTo(map);
}