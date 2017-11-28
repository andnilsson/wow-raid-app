import * as en from 'linq';

export const Classes = [
    {
        name: "Druid",
        img: "https://static1.squarespace.com/static/5662ee35e4b0c4c4329417a9/t/56634967e4b073dc4819f381/1449347432398/druid_22.png",
        color: "#FF7D0A"
    },
    {
        img: "https://www.jinx.com/productimage/767/99/1/900.jpg",
        name: "Hunter",
        color: "#ABD473"
    },
    {
        img: "https://www.jinx.com/productimage/771/99/1/900.jpg",
        name: "Mage",
        color: "#69CCF0"
    },
    {
        img: "https://www.jinx.com/productimage/774/99/1/900.jpg",
        name: "Paladin",
        color: "#F58CBA"
    },
    {
        img: "http://hearthstone.blizzplanet.com/wp-content/uploads/2015/04/priest-weapon.png",
        name: "Priest",
        color: "#ccc"
    },
    {
        img: "http://forum.warmane.com/image.php?u=4128024&dateline=1446571693",
        name: "Rouge",
        color: "#FFF569"
    },
    {
        img: "http://www.gnarlyguides.com/wp-content/uploads/2016/04/shaman-wow-3-3-5a.png",
        name: "Shaman",
        color: "#0070DE"
    },
    {
        img: "http://i.imgur.com/SIHRbgq.png",
        name: "Warlock",
        color: "#9482C9"
    },
    {
        img: "http://cdn-wow.mmoui.com/preview/pvw68030.png",
        name: "Warrior",
        color: "#C79C6E"
    },
]

export function getImgUrl(classname: string): string {
    var img = en.from(Classes).firstOrDefault(x => x.name == classname);
    if (img) return img.img;
    return "";
}

export function getClassColor(classname: string): string {
    var c = en.from(Classes).firstOrDefault(x => x.name == classname);
    return c.color;
}
