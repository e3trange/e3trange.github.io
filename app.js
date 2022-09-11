/* 看元素ele的class里面有没有className */
function have(ele, className) {
    return ele.classList.toString().match(className);
}

/* 下拉菜单 */
const menu__items = document.getElementsByClassName('menu__item');
for(let i=0; i<menu__items.length; i++) {
    menu__items[i].addEventListener('click', function() {
        this.children[1].classList.toggle('dropdown__active');
        if(have(this.children[1], 'dropdown__active')) {
            for(let j=0; j<menu__items.length; j++)
                if(this != menu__items[j] && have(menu__items[j].children[1], 'dropdown__active'))
                    menu__items[j].children[1].classList.toggle('dropdown__active');
        }
    }); 
}

/* 移动导航栏的开关 */
const navbar__toggle = document.querySelector('.navbar__toggle');
const navbar__menu = document.querySelector('.navbar__menu');
function mobileMenu() {
    navbar__toggle.classList.toggle('navbar__toggle__active');
    navbar__menu.classList.toggle('navbar__menu__active');
}

/* navbar__toggle触发效果 */
navbar__toggle.addEventListener('click', mobileMenu);

/* 更换地图 */
const inferno = document.getElementById('inferno');
const mirage = document.getElementById('mirage');
const dust = document.getElementById('dust');
let mapNames = [inferno, dust, mirage];
let mapLinks = ["images/inferno.png", "images/dust.png", "images/mirage.png"];
const image = document.querySelector('.map');
for(let i=0; i<mapNames.length; i++) {
    mapNames[i].addEventListener('click', function() {
        if(this == mirage || this == dust) window.alert('该地图道具暂未制作, 敬请期待!');
        else {
            clearAll();
            image.src = mapLinks[i];
        }
    });
}

/* 未选择地图时的提示 */
const modes = document.querySelectorAll('.mode');
for(let i=0; i<modes.length; i++) {
    modes[i].addEventListener('click', function() {
        if(image.src.match('nomap')) window.alert('请先选择地图!');
    });
}

/* 当移动导航栏开启且已选择地图又已经点击下拉菜单中的模式选项之后, 移动导航栏理应关闭 */
for(let i=0; i<modes.length; i++) { 
    modes[i].addEventListener('click', function() {
        if(have(navbar__toggle, 'navbar__toggle__active') && !image.src.match('nomap'))
            mobileMenu();
    });
}

/* 当改变window-width到一定程度时的改变 */
const main = document.querySelector('.main');
const picture__container = document.querySelector('.picture__container');
const main__content = document.querySelector('.main__content');
function changeArrangement() {
    picture__container.classList.toggle('have__left');
    main__content.classList.toggle('have__right');
    main.classList.toggle('mobileVersion');
    picture__container.classList.toggle('mobileVersion');
    main__content.classList.toggle('mobileVersion');
}
let lastWidth = window.innerWidth;
if(lastWidth < 1500) changeArrangement();
window.addEventListener('resize', function() {
    let judge = (window.innerWidth < 1500 && lastWidth > 1500);
    judge |= (window.innerWidth > 1500 && lastWidth < 1500);
    if(judge) changeArrangement();
    lastWidth = window.innerWidth;
});

/* 提示栏烟闪火雷的显示与消失 */
const msg1 = document.querySelector('.msg1');
const four__modes__button = document.querySelector('.four__modes__button');
const mode__buttons = document.getElementsByClassName('mode__button');
function smokeFlashFireGrenade() {
    msg1.classList.toggle('appear');
    four__modes__button.classList.toggle('appear');
    for(let i=0; i<mode__buttons.length; i++)
        if(have(mode__buttons[i], 'mode__button__active')) 
            mode__buttons[i].classList.toggle('mode__button__active');
}

/* 选择四种道具时的效果 */
for(let i=0; i<mode__buttons.length; i++) {
    mode__buttons[i].addEventListener('click', function() {
        this.classList.toggle('mode__button__active');
    });
}

/* 道具信息栏的显示与消失 */
const item__info = document.querySelector('.item__info');
function msg3AndContentBorder() {
    item__info.classList.toggle('appear');
}

/* 点击基础道具和进阶道具时, 显示提示栏烟闪火雷等按钮 */
const basic = document.getElementById('basic');
const levelup = document.getElementById('levelup');
basic.addEventListener('click', function() {
    if(image.src.match('nomap')) return ;
    clearAll(); level = 1;
    smokeFlashFireGrenade(); msg3AndContentBorder();
});
levelup.addEventListener('click', function() {
    if(image.src.match('nomap')) return ;
    clearAll(); level = 2;
    smokeFlashFireGrenade(); msg3AndContentBorder();
});

/* 所有道具起始点对应元素, 相应的文本信息, 视频链接 */
const item__list = picture__container.children;// 第0项是图片, 第奇数项是投掷起始点, 偶数项是对应投掷终点, 最后一项是画布
let items = [], itemInfos, itemLinks;
for(let i=1; i<item__list.length-1; i+=2) items.push(item__list[i]);
itemInfos = [
    /* inf烟 */
    '这是一颗匪家封b点警家烟, 快速rushB的时候可以由道具位队友给出',
    '这是一颗经典的棺材烟, 可以驱赶棺材上的架枪',
    '经典的石板后警家烟, 瞄准烟囱烟雾快消失的地方, 值得注意的是, 烟囱有时候没有烟雾, 但是这颗烟容错率很高, 大概记一下点位即可',
    '经典的链接深烟, 封住链接凹槽, 但请注意, 链接近点的地方可能有老六',
    '一颗vip阳台封链接的深烟, 可配合A1火使用',
    '下水道封A1烟, 刚好盖住锅炉房门, 当有人进出锅炉房时, 链接的人是能看到的',
    '一颗链接后点烟, 留出了警家到链接的空隙, 但是封住了书房的视野',
    '这是一颗非常好用的锅炉房出门自助链接烟中段烟, 但请注意, 在烟爆开之后一段时间再选择出门, 否则链接凹槽的人会混烟',
    '一颗警家复活快速中路烟, 防止匪rush中路, 掩护队友从链接到马棚',
    '棺材位警扔的隔断烟, 预感到匪可能要进B时反制',
    '一颗高阶的vip灭火烟, 灭的是匪进攻时侧道扔的vip防前压火',
    '一颗警回防时可以用的小坑隔断烟',
    '一颗B区的单向烟, 可以看到棺材附近的CT, 但是扔了这颗烟也相当于一颗B区隔断烟, 所以可以匪在做B区骚扰时使用',
    '侧道快速的A1烟, 可配合队友快速打链接, 该点位还可以投掷侧道链接烟, 只是瞄点比视频中的瞄点要高, 是第二根柱子与房檐的交点, 这两颗烟非常经典',
    '一颗大坑小坑隔断烟, 进攻A1时防止大坑的瞄点, 可给队友扔大坑火等道具打掩护',
    '一颗匪口烟, 配合队友控制香蕉道',
    '这是一颗木板中外侧烟, 是一颗灭火烟, 如果并没有灭火, 那么它是一颗单向烟, 此烟扔完可扔香蕉道反清闪, 配合队友控香蕉道',
    '一颗匪口烟, 这个点位还可以扔石板烟(经典Perfecto烟), 方法是改变瞄点至从下往上数同列第二个圆桶中心偏左一点',
    '一颗B区过点烟',
    '经典的二楼草车自助烟, 出二楼必备',
    '一颗链接深烟',
    'A包点书房隔断烟, 配合链接深烟, 在打A时隔断B区队员的回防',
    '被QuQu命名为A区的屠杀烟, 之所以放在基础道具就是因为它瞄点非常简单, 对A区的防守也非常有帮助',
    '在中路近点扔的链接烟, 注意不要在类似位置随便扔, 因为可能会有缝, 方法是瞄着那一条黑线或者黑线往下一点的位置',
    '中路扔的书房链接烟',
    '匪二楼扔的拱门烟?? 可以用来骗, 然后转B',
    '中路的很实用又简单的拱门烟',
    '出匪口就能封的A1烟',
    /* inf火 */
    '经典的香蕉道扔的后点火',
    '经典的A1天火, 如果配合队友扔的vip火, 会堵死在马棚下的CT, 当瞄点变为第二根天线上时, 变成马棚下火',
    '大坑火, 有瞄点的, 对面扔了墙角烟也能够烧到, 当然, 必要时需要A1隔断烟掩护投掷',
    '五步蛇之vip火, 非常经典的火, 注意视频中的瞄点, 第一时间投掷防止CT的A2前压',
    '棺材扔石板后火, 可配合棺材的木板烟使用',
    '经典且重要的香蕉道木板火, 第一身位抢香蕉道可用, 防止CT木板后穿人前压',
    '非常经典的一二三箱火, 进攻B区或者回防可根据队友信息扔',
    '开局快速防香蕉道rush火, 保证是在匪还未到石板时蔓延开',
    '香蕉道中段火, 配合匪口烟使用, 烟后火出烟就踩火',
    '当匪扔了vip火之后, 可以稍等一下再反火反雷, 防止匪上vip',
    '回防时可以使用, 很多时候匪打下A1后就在长箱后下包, 此火可以拖延下包时间; 匪用此火拖延拆包有奇效',
    '警家回防用三箱火, 一般链接烟已经由匪扔了, 注意最后是由蹲向站的过程中投掷的',
    '这是一颗静止跳投状态下投掷的马棚下火, 很好用',
    /* inf雷 */
    '第一时间炸侧道雷, 让五步蛇们非常的快乐',
    '相对于炸木材后, 这颗炸左侧(警视角)的雷就需要瞄点了',
    '一颗匪口雷, 可以让那些喜欢在匪口架枪的人吃一个大满贯',
    '中路扔下水道雷, 请在有烟情况下使用(静止投掷)',
    '听上二楼的脚步扔, 雷在楼梯上段爆开',
    '当警听见滴滴声时直接炸, 炸的位置是在棺材旁下包的人',
    '炸在棺材架枪的人, 注意是跑一步扔---既然他那么喜欢站在棺材上, 那就送他进去! (PS: 此点位是可以从木板上跳上去的)',
    '一颗恶心雷, 专炸五步蛇, 在阳台上爆开',
    '一箱上炸木板, 除了这个瞄点, 还有其它瞄点, 大同小异可以自己探索',
    '大坑炸A1的满雷',
    '专门炸躲在墙后架枪的人, 注意这个道具的站位, 是在香蕉道第二个台阶上的, 请注意图中该道具投掷点脚下的黑线',
    /* inf闪 */
    '一颗顶级的白A2楼里面架枪的敌人, 回防时可用',
    '匪口过墙闪, 道具位给',
    '香蕉道高闪, 在石板后爆开, 可白到沙袋后面侦察的敌人',
    '弹墙石板后闪, 可以跟闪出, 也可以听---如果石板后藏着人, 该闪砸到身上会有特殊声音',
    '经典的出中路闪, 前两个身位几乎必扔, 防止CT中路侦察偷人',
    '大坑A1闪, 一般情况下可以乱扔, 但这个瞄点的闪是一个A1的瞬爆闪, 可以配合A1靠墙的队友进行反清',
    '棺材反清闪',
    '想和木板后的狙碰一碰?这里有一颗实用的自助闪',
    '匪上A2楼的一颗不闪自己的闪光(对枪时身位请小拉)',
    'A2楼防守不闪自己的闪, 可与闪同步出',
    '侧道全白, 包括旋转楼梯左侧的老六位',
    '一颗经典且好用的匪出锅炉房瞬爆自助闪',
    '经典的烟囱闪, 瞄点比较宽松, 这是一颗包点书房链接闪',
    '经典且实用的一箱自助闪, 瞄点只需要在从上往下第3个黑线上就能达到效果',
    '经典防rushB闪, 可以配合队友侦察香蕉道, 瞄点比较松, 比如也可以把瞄点瞄到房檐角落',
    '实用的B包点闪, 抵住木材扔',
];
itemLinks = [
    /* inf 烟 */ 
    'https://www.bilibili.com/video/BV1mt4y1C7c3?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=25.6',
    'https://www.bilibili.com/video/BV17B4y1K7pY?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1097.6',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=96.7',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=216.4',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=445.9',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=165.9',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=254.8',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=316.0',
    'https://www.bilibili.com/video/BV1E94y1S7rm?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=158.9',
    'https://www.bilibili.com/video/BV1XV41117aF?p=7&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.8',
    'https://www.bilibili.com/video/BV1XV41117aF?p=9&spm_id_from=pageDriver&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.5',
    'https://www.bilibili.com/video/BV1XV41117aF?p=18&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.3',
    'https://www.bilibili.com/video/BV1XV41117aF?p=22&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.0',
    'https://www.bilibili.com/video/BV1XV41117aF?p=23&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.6',
    'https://www.bilibili.com/video/BV1XV41117aF?p=25&t=1.5',
    'https://www.bilibili.com/video/BV1Vg411j7KQ?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=29.8',
    'https://www.bilibili.com/video/BV1Vg411j7KQ?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=18.9',
    'https://www.bilibili.com/video/BV1Vg411j7KQ?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=64.5',
    'https://www.bilibili.com/video/BV1cQ4y1S7W9?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=140.9',
    'https://www.bilibili.com/video/BV1Yg411o7YE?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=39.7',
    'https://www.bilibili.com/video/BV1xY41177EA/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=83.6',
    'https://www.bilibili.com/video/BV1E3411T7yZ/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=164.7',
    'https://www.bilibili.com/video/BV1FZ4y1S7PM/?spm_id_from=trigger_reload&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=96.7',
    'https://www.bilibili.com/video/BV1E3411T7yZ/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=161.8',
    'https://www.bilibili.com/video/BV1bp4y1X7V3?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=197.4',
    'https://www.bilibili.com/video/BV1bp4y1X7V3?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=347.6',
    'https://www.bilibili.com/video/BV1bp4y1X7V3?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=456.5',
    'https://www.bilibili.com/video/BV1rY4y177Dw?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=2.2',
    /* inf火 */
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=63.2',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=203.9',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=245.5',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=263.3',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=393.7',
    'https://www.bilibili.com/video/BV1A34y1v73c?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=231.4',
    'https://www.bilibili.com/video/BV1A34y1v73c?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=244.7',
    'https://www.bilibili.com/video/BV1bN4y1V7MB?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=57.3',
    'https://www.bilibili.com/video/BV1xY41177EA/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=25.0',
    'https://www.bilibili.com/video/BV1E3411T7yZ/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=47.7',
    'https://www.bilibili.com/video/BV18T4y1k7YD?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=19.4',
    'https://www.bilibili.com/video/BV18T4y1k7YD?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=45.2',
    'https://www.bilibili.com/video/BV1tW4y11745?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=43.2',
    /* inf雷 */
    'https://www.bilibili.com/video/BV1PZ4y1W7Dr?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=35.9',
    'https://www.bilibili.com/video/BV1PZ4y1W7Dr?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=126.9',
    'https://www.bilibili.com/video/BV15r4y1J7SZ?p=2&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=0.8',
    'https://www.bilibili.com/video/BV1kL4y1N7LH?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=14.6',
    'https://www.bilibili.com/video/BV1kL4y1N7LH?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=172.7',
    'https://www.bilibili.com/video/BV1kL4y1N7LH?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=277.2',
    'https://www.bilibili.com/video/BV1tY4y1878h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=6.5',
    'https://www.bilibili.com/video/BV15r4y1s7oh?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=1.1',
    'https://www.bilibili.com/video/BV14T4y1C7kX?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=2.3',
    'https://www.bilibili.com/video/BV14T4y1C7kX?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=83.7',
    'https://www.bilibili.com/video/BV1bq4y1a7gP/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=18.1',
    /* inf闪 */
    'https://www.bilibili.com/video/BV1kL4y1N7LH?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=198.9',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=47.0',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=57.3',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=78.1',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=160.1',
    'https://www.bilibili.com/video/BV1Gf4y1p77h?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=504.2',
    'https://www.bilibili.com/video/BV1ya411o7VY?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=134.2',
    'https://www.bilibili.com/video/BV1Vq4y1h7Xk?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=2.0',
    'https://www.bilibili.com/video/BV1Vq4y1h7Xk?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=102.5',
    'https://www.bilibili.com/video/BV1Vq4y1h7Xk?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=179.6',
    'https://www.bilibili.com/video/BV1J64y1i7ff?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=25.1',
    'https://www.bilibili.com/video/BV1gS4y167Pi?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=42.3',
    'https://www.bilibili.com/video/BV1jB4y1p7Mx?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=6.8',
    'https://www.bilibili.com/video/BV1KF411n7C9?spm_id_from=333.337.search-card.all.click&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=4.9',
    'https://www.bilibili.com/video/BV1xY41177EA/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=12.3',
    'https://www.bilibili.com/video/BV1xY41177EA/?spm_id_from=333.788&vd_source=2818d1c4a881a681a109bf22cf3e1944&t=110.4',
];

/* 解决画布箭头模糊的问题 */
const canvas = document.querySelector('.canvas');
const pen = canvas.getContext('2d');
function getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};
let ratio = getPixelRatio(pen);
canvas.width = canvas.width * ratio;
canvas.height = canvas.height * ratio;
pen.scale(ratio, ratio);

/* 这个函数应该在每次投掷物起始点(变大)或者(变小或者消失)后执行, 使得其对应的终点、箭头出现或者(可能发生的消失) */
function changeEndWhenStartChange(startElement, choose) {
    let endElement =  document.getElementById(startElement.getAttribute('id').replace('st', 'nd'));
    if(choose == 'appear')  {
        endElement.classList.toggle('appear');
        let beginX = startElement.offsetLeft + 12, beginY = startElement.offsetTop + 12;
        let endX1 = endElement.offsetLeft + 15, endY1 = endElement.offsetTop + 15;
        let dis = Math.sqrt((Math.pow(endX1-beginX, 2) + Math.pow(endY1-beginY, 2)));
        let d1 = 8, d2 = dis - d1;
        if(dis <= 4 * d1) return ;// 投掷始末点距离过小不予画线
        let endX = (d2*endX1+d1*beginX) / (d1+d2), endY = (d2*endY1+d1*beginY) / (d1+d2);
        let dashLen = d1;
        let num = Math.floor(Math.sqrt((Math.pow(endX-beginX, 2) + Math.pow(endY-beginY, 2))) / dashLen);
        pen.strokeStyle = 'pink';
        pen.lineCap = 'round';
        pen.lineWidth = 3;
        pen.beginPath();
        for(let i=0; i<num; i++) {
            if(i % 2 == 0) pen.moveTo(beginX+(endX-beginX)/num*i, beginY+(endY-beginY)/num*i);
            else pen.lineTo(beginX+(endX-beginX)/num*i, beginY+(endY-beginY)/num*i);
        }
        pen.stroke();
    }
    else {
        endElement.classList.toggle('appear');
        pen.clearRect(0, 0, 800, 800);
    }
}

/* 点击一个道具投掷点时对应的效果 */
const msg3__content = document.querySelector('.msg3__content');
const learn = document.querySelector('.learn');
function changeStartAndEnd(startElement, itemInfo, itemLink) {
    startElement.classList.toggle('start__active');
    startElement.children[0].classList.toggle('fa-lg');
    startElement.children[0].classList.toggle('fa-xl');
    learn.classList.toggle('appear');
    if(have(startElement, 'start__active')) {
        changeEndWhenStartChange(startElement, 'appear');
        msg3__content.innerHTML = itemInfo;
        learn.setAttribute('href', itemLink);
    }
    else {
        changeEndWhenStartChange(startElement, 'disappear');
        msg3__content.innerHTML = '';
        learn.setAttribute('href', '#');
    }
}

/* 当点击一个道具投掷起始点, 其对应的终点、路线应该显示(消失), 同时, 上一次点击(如果有)对应的效果要消失 */
let lastClickItemIndex = -1;
for(let i=0; i<items.length; i++) {
    items[i].addEventListener('click', function() {
        if(lastClickItemIndex == -1) {
            changeStartAndEnd(this, itemInfos[i], itemLinks[i]);
            lastClickItemIndex = i;
        }
        else if(items[lastClickItemIndex] != this) {
            changeStartAndEnd(items[lastClickItemIndex], itemInfos[lastClickItemIndex], itemLinks[lastClickItemIndex]);
            changeStartAndEnd(this, itemInfos[i], itemLinks[i]);
            lastClickItemIndex = i;
        }
        else {
            changeStartAndEnd(this, itemInfos[i], itemLinks[i]);
            lastClickItemIndex = -1;
        }
    });
}

/* 按下烟闪火雷四个按钮显示\关闭道具起始点 */
for(let i=0; i<mode__buttons.length; i++) {
    mode__buttons[i].addEventListener('click', function() {
        let str1, str2, str3;// 等级, 道具类型, 地图
        if(level == 1) str1 = 'level1';
        else str1 = 'level2';
        str2 = this.getAttribute('id').replace('mode', 'st');
        if(image.src.match('inferno')) str3 = 'inf';
        else if(image.src.match('dust')) str3 = 'dust';
        else str3 = 'mir';
        for(let j=0; j<items.length; j++) {
            let x = items[j];
            if(have(x, str1) && have(x, str2) && have(x, str3)) {
                if(lastClickItemIndex == j) {
                    lastClickItemIndex = -1;
                    changeStartAndEnd(items[j], itemInfos[j], itemLinks[i]);
                }
                x.classList.toggle('appear');
            }
        }
    });
}

/* 第一次点击学习按钮时, 注意提醒音量 */
let clickLearnTimes = 0;
learn.addEventListener('click', function() {
    if(learn.getAttribute('href') == '#') return ;
    clickLearnTimes++;
    if(clickLearnTimes == 1) window.alert('将会跳转到视频指定地方, 请注意调节音量\n(该信息不再显示)');
});

/* 出现区域道具选择栏以及道具信息栏 */
const section = document.getElementById('section');
const msg2 = document.querySelector('.msg2');
const section__choose = document.querySelector('.section__choose');
const section__list = section__choose.children;
section.addEventListener('click', function() {
    if(image.src.match('nomap')) return ;
    clearAll();
    msg2.classList.toggle('appear');
    item__info.classList.toggle('appear');
    section__choose.classList.toggle('appear');
    let str = '.section__';
    if(image.src.match('inferno')) str += 'inf';
    else if(image.src.match('dust')) str += 'dust';
    else str += 'mir';
    document.querySelector(str).classList.toggle('appear');
});

/* 按下每个区域按钮的效果 */
const section__buttons = document.getElementsByClassName('section__button');
for(let i=0; i<section__buttons.length; i++) {
    section__buttons[i].addEventListener('click', function() {
        clearAllStarts();
        for(let j=0; j<section__buttons.length; j++)
            if(j != i && have(section__buttons[j], 'section__button__active'))
                section__buttons[j].classList.toggle('section__button__active');
        this.classList.toggle('section__button__active');
        if(have(this, 'section__button__active')) {
            let appearPointsList = document.getElementsByClassName(this.getAttribute('id'));
            for(let j=0; j<appearPointsList.length; j++) {
                appearPointsList[j].classList.toggle('appear');
            }  
        }
    });
}

/* 点击菜单栏中的'组合道具'出现阵营选择栏以及提示信息 */
const combine = document.getElementById('combine');
const msg4 = document.querySelector('.msg4');
const combine__choose = document.querySelector('.combine__choose');
combine.addEventListener('click', function() {
    if(image.src.match('nomap')) return ;
    clearAll();
    msg4.classList.toggle('appear');
    combine__choose.classList.toggle('appear');
});

/* 点击T按钮或者CT按钮时发生的事情 */
const side__buttons = document.getElementsByClassName('side__button');
const side__lists = document.getElementsByClassName('side__list');
for(let i=0; i<2; i++) {
    side__buttons[i].addEventListener('click', function() {
        clearAllStarts();
        for(let j=0; j<side__lists.length; j++)
            if(have(side__lists[j], 'appear'))
                side__lists[j].classList.toggle('appear');
        let j = (i ? 0 : 1);
        if(have(side__buttons[j], 'side__button__active'))
            side__buttons[j].classList.toggle('side__button__active');
        this.classList.toggle('side__button__active');
        if(have(this, 'side__button__active')) {
            let str1, str2;// 阵营, 地图
            if(have(this, 'button__CT')) str1 = 'side__list__CT';
            else str1 = 'side__list__T';
            if(image.src.match('inferno')) str2= 'inf';
            else if(image.src.match('dust')) str2 = 'dust';
            else str2 = 'mir';
            for(let j=0; j<side__lists.length; j++)
                if(have(side__lists[j], str1) && have(side__lists[j], str2))
                    side__lists[j].classList.toggle('appear');
        }
    }); 
}

/* 当点击每一个组合道具选项时, 应该收回下拉菜单*/
const side__list__dropdowns = document.getElementsByClassName('side__list__dropdown');
for(let i=0; i<side__list__dropdowns.length; i++) {
    side__list__dropdowns[i].addEventListener('click', function() {
        this.parentNode.classList.toggle('appear');
        this.parentNode.parentNode.children[0].classList.toggle('side__button__active');
    });
}

/* 当点击职业选择道具时显示信息 */
const pro = document.getElementById('pro');
pro.addEventListener('click', function() {
    if(image.src.match('nomap')) return ;
    window.alert('该板块暂未制作, 请自行观看demo或者精彩对局(b站关注Aycsgo等Up主)');
});

/* 清空地图上存在的所有的起始点 */
function clearAllStarts() {
    for(let i=0; i<items.length; i++) {
        let x = items[i];
        if(have(x, 'appear')) {
            if(i == lastClickItemIndex) {
                lastClickItemIndex = -1;
                changeStartAndEnd(items[i], itemInfos[i], itemLinks[i]);
            }
            x.classList.toggle('appear');
        }
    }
}

/* 清除烟闪火雷四个按钮以及其上的提示信息 */
function clearFourButtons() {
    if(have(msg1, 'appear')) smokeFlashFireGrenade();
}

/* 清除道具信息提示栏 */
function clearItemInfo() {
    if(have(item__info, 'appear')) item__info.classList.toggle('appear');
}

/* 清除区域选择的提示语、按钮的强调特效等 */
function clearSectionButton() {
    if(have(msg2, 'appear')) {
        msg2.classList.toggle('appear');
        section__choose.classList.toggle('appear');
        for(let i=0; i<section__list.length; i++) {
            let x = section__list[i];
            if(have(x, 'appear')) {
                x.classList.toggle('appear');
                for(let j=0; j<x.children.length; j++) {
                    let y = x.children[j];
                    if(have(y, 'section__button__active'))
                        y.classList.toggle('section__button__active');
                }
                break;
            }
        }
    }
}

/* 清除阵营选择的提示语、按钮以及相应特效 */
function clearSideButton() {
    if(have(msg4, 'appear')) {
        msg4.classList.toggle('appear');
        combine__choose.classList.toggle('appear');
        for(let i=0; i<side__lists.length; i++)
            if(have(side__lists[i], 'appear')) {
                side__lists[i].classList.toggle('appear');
                side__lists[i].parentNode.children[0].classList.toggle('side__button__active');
                break;
            }
    }
}

/* 清除所有东西, 这个应该在按下任意下拉菜单时起作用 */
function clearAll() {
    clearAllStarts();
    clearFourButtons();
    clearItemInfo();
    clearSectionButton();
    clearSideButton();
}